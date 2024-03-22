import { NextFunction, Request, Response } from "express";
import { WithdrawalRepository } from "../repository/WithdrawalRepository";
import { WalletRepository } from "../repository/WalletRepository";
import { UpdateOneDto, searchDto } from "../dto/GeneralDto";
import Withdrawal from "../models/Withdrawal";

class WithdrawalController {
  private withdrawalRepo: WithdrawalRepository = new WithdrawalRepository();
  private walletRepo: WalletRepository = new WalletRepository();

  withdrawalRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: Record<string, string> = req.body;
      const result = await this.withdrawalRepo.withdrawRequestFunds({
        ...req.body,
      });
      if (result) {
        return res.status(201).json({
          error: false,
          data: result,
        });
      }
    } catch (e: any) {
      return res.status(400).json({
        error: true,
        message: e.message,
      });
    }
  };

  withdrawalApproveFunds = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
   

      const {id, user, wallet, status} = req.body;
      const getWithdrawalData =
        await this.withdrawalRepo.WithdrawalApproveFunds(id);

        
      if (!getWithdrawalData) {
      } else {
        const searchDto: searchDto = {
          field: "_id",
          value: wallet,
        };
        const checkIfEnoughFunds = await this.walletRepo.FindOne(searchDto);

       
        if (!checkIfEnoughFunds) {
          return res.status(400).json({
            status: false,
            message: "Wallet could not be found.",
          });
        } else {
          if (checkIfEnoughFunds["amount"] > getWithdrawalData.amount) {
            const updateDto: UpdateOneDto = {
              _id: checkIfEnoughFunds["_id"],
              update: {
                amount: checkIfEnoughFunds["amount"] - getWithdrawalData.amount,
              },
            };

            const updateUserWallet = await this.walletRepo.UpdateOne(updateDto);

            if (!updateUserWallet) {
              return res.status(400).json({
                status: false,
                message: "Wallet could not be debited.",
              });
            }else{

              const  updataData = {
                user: req.body.user,
                wallet: req.body.wallet,
                status: req.body.status,
                balance: checkIfEnoughFunds["amount"] - getWithdrawalData.amount
              }
                const updateWithdrawStatus = await Withdrawal.updateOne({"_id":id}, {...updataData})
              if(updateWithdrawStatus){
                  return res.status(200).json({
                    status: true,
                    message: "Withdrawal Successful."
                })
              }else{
                // rollover
              }
            }
          }else{
         
            return res.status(400).json({
              status:false,
              message:"Insufficient funds in your wallet."
            })
          }
        }
      }
    } catch (e: any) {
      return res.status(400).json({
        error: true,
        message: e.message,
      });
    }
  };
}

export default new WithdrawalController();
