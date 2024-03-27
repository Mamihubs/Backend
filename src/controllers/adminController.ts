import { NextFunction, Request, Response } from "express";
import { UpdateOneDto } from "../dto/GeneralDto";
import { CreateNewUserDto } from "../dto/UserDto";
import User, { UserStatus, UserType } from "../models/User";
import { ProductRepository } from "../repository/ProductRepository";
import { SalesOrderRepository } from "../repository/SalesOrderRepository";
import { UserRepository } from "../repository/UserRepository";
import { AdminService } from "../services/admin.service";
import { ProductService } from "../services/product.service";
import SalesService from "../services/sales.service";
import { UserService } from "../services/user.service";
import { VendorService } from "../services/vendor.service";
import { userRegistrationValidation } from "../validations/authValidations";
import bcrypt from "bcryptjs";
import { ProfileRepository } from "../repository/ProfileRepository";
import Sales from "../models new/Sales";
import Product from "../models/Product";
import SalesOrder from "../models/SalesOrder";
import { storeDataInCacheMemory } from "../interceptors";

class AdminController {
  private SalesService: SalesService = new SalesService();
  private allProducts: ProductRepository = new ProductRepository();
  private allOrders: SalesOrderRepository = new SalesOrderRepository();
  private allUsers: UserRepository = new UserRepository();
  private vendorService: VendorService = new VendorService();
  private userService: UserService = new UserService();
  private profileRepository: ProfileRepository = new ProfileRepository();
  private adminService: AdminService = new AdminService();

  getDashboard = async (req: Request, res: Response) => {
    try {
      const sales = await this.adminService.getAllSales();
      const products = await this.adminService.getAllProducts();
      const orders = await this.adminService.getAllOrders();
      const data = { sales, products, orders }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };

  getAnalytics = async (req: Request, res: Response) => {
    try {
      const sales = await this.adminService.getAllSales();
      const products = await this.adminService.getAllProducts();
      const orders = await this.adminService.getAllOrders();
      const data = { sales, products, orders }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.adminService.getAllProducts();
      const data = { products }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.adminService.getAllOrders();
      const data = { orders }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getAllVendorDetails = async (req: Request, res: Response) => {
    try {
      const details = await this.adminService.getVendorDetails(req.params.id);
    const data = { data: details }
    storeDataInCacheMemory(req, data, 10)
    return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };

  getCustomers = async (req: Request, res: Response) => {
    try {
      const users = await User.find({ type: "Customer" });
      const data = { users }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };

  getVendors = async (req: Request, res: Response) => {
    try {
      const users = await User.find({ type: "Vendor" });
      const data = { users }
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getVendorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
    const data = await this.adminService.getVendorById(id);
    storeDataInCacheMemory(req, data, 10)
    return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  addVendor = async (req: Request, res: Response) => {
    const { error } = userRegistrationValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message.toUpperCase(),
      });
    }

    // Check if user exists
    const user = await this.userService.getOneUser("login", req.body.email);

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }
    const newUser: CreateNewUserDto = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      login: req.body.email,
      type: UserType.VENDOR,
      password: req.body.password,
    };
    const newProfileData = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.login,
      active: true,
    };

    const profile = await this.profileRepository.Create(newProfileData);
    const newUserData = {
      fullName: newUser.firstName + " " + newUser.lastName,
      login: newUser.login,
      password: await bcrypt.hash(newUser.password, 10),
      profileID: profile?._id,
      type: newUser.type,
      status: UserStatus.ACTIVE,
      active: true,
    };
    const userCreated = await User.create(newUserData);

    // create user

    if (!userCreated) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong while creating user",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      data: userCreated,
    });
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.adminService.getProductById(id);
      storeDataInCacheMemory(req, data, 10)
    return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.adminService.getOrderById(id);
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };
  getTransaction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await this.adminService.getOrderById(id);
      storeDataInCacheMemory(req, data, 10)
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
    }
  };

  updateAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateDto: UpdateOneDto = {
      _id: id,
      update: req.body,
    };
    const user = await this.allUsers.UpdateOne(updateDto);
    return res.status(200).json({ user });
  };

  getIntegration = async (req: Request, res: Response) => {
    return res.status(200).json({
      integration: [],
    });
  };
  getSettings = async (req: Request, res: Response) => {
    return res.status(200).json({
      settings: [],
    });
  };

  // settings profile
  settingsProfile = async (req: Request, res: Response) => {
    // update profile
    return res.status(200).json({});
  };
  settingsBilling = async (req: Request, res: Response) => {
    // add billing information
    return res.status(200).json({});
  };
  settingsOrders = async (req: Request, res: Response) => {
    return res.status(200).json({});
  };

  // delete product
  deleteProduct = async (req: Request, res: Response) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
      return res.status(200).json("Product successfully deleted!");
    } else {
      return res.status(400).json("Error deleting this product!");
    }
  };

  // get admin store products
  getAdminStoreProducts = async (req: Request, res: Response) => {
    const products = await Product.find({ created_by: req.params.id });

    if (products) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json("Products not found!");
    }
  };
}

export default new AdminController();
