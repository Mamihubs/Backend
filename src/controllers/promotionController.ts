import { Request, Response } from "express";
import { PromotionService } from "../services/promotion.service";
import { WalletRepository } from "../repository/WalletRepository";
import { UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { WalletDto } from "../dto/WalletDto";
import { PromotionPlanService } from "../services/promotionplan.service";
import { storeDataInCacheMemory } from "../interceptors";

class PromotionController {
  private promoService: PromotionService;
  private walletRepo: WalletRepository;
  private promoPlanService: PromotionPlanService;

  constructor() {
    this.promoService = new PromotionService();
    this.walletRepo = new WalletRepository();
    this.promoPlanService = new PromotionPlanService();
  }

  createPromotion = async (req: Request, res: Response) => {
    try {
      const { user, plan_type, product } = req.body;
      const query: searchDto = {
        field: "user",
        value: user,
      };

      const userWallet = await this.walletRepo.FindOne(query);

      const fetchPlan = await this.promoPlanService.findPromoPlanById(
        plan_type
      );

      if (!userWallet) {
        return res.status(500).json({
          status: false,
          message: "You have not funded your wallet.",
        });
      }

      if (!fetchPlan) {
        return res.status(500).json({
          status: false,
          message: "Something went wrong with the plan.",
        });
      }

      const amount = userWallet["amount"];
      const planAmount = fetchPlan["amount"];

      var date = new Date();
      date.setDate(date.getDate() + fetchPlan["duration"]);
      const expired_by = date.toUTCString();

      if (planAmount > amount) {
        return res.status(500).json({
          status: false,
          message: "You don't have sufficient funds.",
        });
      }
      const debitAmount =
        parseFloat(amount.toString()) - parseFloat(planAmount.toString());

      // deduct the amount from the wallet

      const updateOneDto: UpdateOneDto = {
        _id: userWallet["_id"],
        update: {
          amount: debitAmount,
        },
      };

      const updateWallet = await this.walletRepo.UpdateOne(updateOneDto);

      if (!updateWallet) {
        return res.status(500).json({
          status: false,
          message: "Can't subscribe for promotion, something went wrong.",
        });
      }

      const promotion = this.promoService.createPromotion({
        plan_type,
        product,
        user,
        expired_by: expired_by.toString(),
      });

      if (!promotion) {
        return res.status(500).json({
          status: false,
          message: "An error occurred while creating promotion.",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Promotion created successfully.",
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "Error creating promotion",
      });
    }
  };

  findAllPromotions = async (req: Request, res: Response) => {
    try {
      const allpromotion = await this.promoService.findAllPromotion();

      if (!allpromotion) {
        return res.status(500).json({
          status: false,
          message: "An error occurred while fetching the promotion",
        });
      }
      const data = { message: "success", data: allpromotion }
      // store cache in memory
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while fetching all promotion",
      });
    }
  };

  deletePromotion = async (req: Request, res: Response) => {
    try {
      const promo = await this.promoService.deletePromotion({
        ...req.body,
      });

      if (!promo) {
        return res.status(500).json({
          status: false,
          message: "An error occurred while deleting the promotion",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Promotion plan deleted successfully.",
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "An error occurred while deleting promotion",
      });
    }
  };
}

export default new PromotionController();
