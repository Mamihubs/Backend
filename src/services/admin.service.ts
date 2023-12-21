import Profile from "../models/Profile";
import Product from "../models/Product";
import Sales from "../models/Sales";
import Bank from "../models/Bank";
import IdentityCompany from "../models/IdentityCompany";
import IdentityIndividual from "../models/IdentityIndividual";
import SalesOrder from "../models/SalesOrder";
import User from "../models/User";
import Business from "../models/Business";
import { CompanyRepository } from "../repository/CompanyRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { ProfileRepository } from "../repository/ProfileRepository";
import { SalesOrderRepository } from "../repository/SalesOrderRepository";
import { UserRepository } from "../repository/UserRepository";
import { WalletRepository } from "../repository/WalletRepository";
import SalesService from "./sales.service";

export class AdminService {
  private userRepository: UserRepository;
  private profileRepository: ProfileRepository;
  private companyRepository: CompanyRepository;
  private walletRepository: WalletRepository;
  private productRepository: ProductRepository;
  private orders: SalesOrderRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.profileRepository = new ProfileRepository();
    this.companyRepository = new CompanyRepository();
    this.walletRepository = new WalletRepository();
    this.productRepository = new ProductRepository();
    this.orders = new SalesOrderRepository();
  }

  async getVendorById(id: string) {
    try {
      // const user =  await this.userRepository.FindOne({field: '_id', value: id})
      const user = await User.findOne({ _id: id });
      const profile = await Profile.findOne({ _id: user?.profileID });
      const sales = await Sales.find({ updated_by: id });
      const orders = await SalesOrder.find({ created_by: id });
      const products = await Product.find({ created_by: id });

      return { user, profile, sales, orders, products };
    } catch (e) {
      console.log(e);
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {}
  }
  async getProductById(id: string) {
    try {
      const products = await Product.findOne({ _id: id });
      return products;
    } catch (error) {}
  }
  async getAllOrders() {
    try {
      const orders = await SalesOrder.find();
      return orders;
    } catch (error) {}
  }
  async getVendorDetails(id: string) {
    try {
      const user = await User.findOne({ _id: id });
      const bank = await Bank.findOne({ user: id });
      const profile = await Profile.findOne({ _id: user?.profileID });
      const identity_company = await IdentityCompany.findOne({ user: id });
      const identity_individual = await IdentityIndividual.findOne({
        user: id,
      });
      const business = await Business.findOne({ user: id });
      return { profile, identity_company, identity_individual, bank, business };
    } catch (error) {}
  }
  async getOrderById(id: string) {
    try {
      const orders = await SalesOrder.findOne({ _id: id });
      return orders;
    } catch (error) {}
  }
  async getAllSales() {
    try {
      const sales = await Sales.find();
      return sales;
    } catch (error) {}
  }
  async getSaleById(id: string) {
    try {
      const sales = await Sales.findOne({ _id: id });
      return sales;
    } catch (error) {}
  }
}
