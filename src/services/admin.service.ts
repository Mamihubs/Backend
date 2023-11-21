import Profile from "../models/Profile";
import Product from "../models/Product";
import Sales from "../models/Sales";
import SalesOrder from "../models/SalesOrder";
import User from "../models/User"; 
import { CompanyRepository } from "../repository/CompanyRepository";
import { ProductRepository } from "../repository/ProductRepository";
import { ProfileRepository } from "../repository/ProfileRepository";
import { SalesOrderRepository } from "../repository/SalesOrderRepository";
import { UserRepository } from "../repository/UserRepository";
import { WalletRepository } from "../repository/WalletRepository";
import SalesService from "./sales.service";

 

export class AdminService{
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private companyRepository: CompanyRepository;
    private walletRepository: WalletRepository;
    private productRepository: ProductRepository;
    private orders:SalesOrderRepository;

    constructor(){
        
        this.userRepository =new UserRepository();
        this.profileRepository =new ProfileRepository();
        this.companyRepository = new CompanyRepository();
        this.walletRepository = new WalletRepository();
        this.productRepository = new ProductRepository();
        this.orders = new SalesOrderRepository();
    }

    async getVendorById(id:string){

        try{
            // const user =  await this.userRepository.FindOne({field: '_id', value: id})
            const user =   await User.findOne({_id:id});
            const profile =   await Profile.findOne({_id:user?.profileID});
            const sales = await Sales.find({updated_by:id});
            const orders = await SalesOrder.find({created_by:id});
            const products = await Product.find({created_by:id});
    
            return {user,profile, sales, orders,products};
        }catch(e){
console.log(e)
        }
        
    }
}