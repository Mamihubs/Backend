import { Request, Response } from "express";
import { UpdateOneDto } from "../dto/GeneralDto";
import { ProductRepository } from "../repository/ProductRepository";
import { SalesOrderRepository } from "../repository/SalesOrderRepository";
import { UserRepository } from "../repository/UserRepository";
import { AdminService } from "../services/admin.service";
import { ProductService } from "../services/product.service";
import SalesService from "../services/sales.service";
import { UserService } from "../services/user.service";
import { VendorService } from "../services/vendor.service";
import { userRegistrationValidation } from "../validations/authValidations";

class AdminController{
    private SalesService: SalesService = new SalesService();
    private allProducts: ProductRepository = new ProductRepository();
    private allOrders: SalesOrderRepository = new SalesOrderRepository();
    private allUsers: UserRepository = new UserRepository();
    private vendorService: VendorService = new VendorService();
    private userService:UserService = new UserService() 

    getDashboard = async (req:Request, res:Response)=>{
        const sales = await this.SalesService.FindAll();
        const products = await this.allProducts.FindAll();
        const orders = await this.allOrders.FindAll();
        return res.status(200).json({sales, products, orders});
    }

    getAnalytics = async (req:Request, res:Response)=>{
        const sales = await this.SalesService.FindAll();
        const products = await this.allProducts.FindAll();
        const orders = await this.allOrders.FindAll();
        return res.status(200).json({sales, products, orders});
    }
    getProducts = async (req:Request, res:Response)=>{
       
        const products = await this.allProducts.FindAll(); 
        return res.status(200).json({ products });
    }
    getOrders = async (req:Request, res:Response)=>{
         
        const orders = await this.allOrders.FindAll();
        return res.status(200).json({ orders});
    }

    getCustomers = async (req:Request, res:Response) => {
        const users = await this.allUsers.FindAll();

        return res.status(200).json({users})
    }
    getVendors = async (req:Request, res:Response) => {
        const users = await this.allUsers.FindAll();

        return res.status(200).json({users})
    }
    addVendor = async (req:Request, res:Response) => {
        const { error } = userRegistrationValidation(req.body)
        if(error){
            return res.status(400).json({
                status: false,
                message: error.details[0].message.toUpperCase(),
            })
        }
        
        // Check if user exists
        const user = await this.userService.getOneUser('login',req.body.email);
        
        if(user){
            return res.status(400).json({
                status: false,
                message: 'User already exists',
            })
        }
        
        // create user
        const newUser = await this.userService.createUser({firstName: req.body.firstName, lastName: req.body.lastName, login: req.body.email,password: req.body.password})
        
        if(!newUser){
            return res.status(500).json({
                status: false,
                message: 'Something went wrong while creating user',
            })
        }
        
         
         
        
        return res.status(200).json({
            status: true,
            message: 'User created successfully',
            data: newUser
        })
    }


    getProduct = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneProduct(id)
        return res.status(200).json({data})
    }
    getOrder = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneOrder(id)
        return res.status(200).json({data})
    }
    getTransaction = async(req: Request, res: Response)=>{
        const { id } = req.params;
    const data = await this.vendorService.findOneTransaction(id)
        return res.status(200).json({data})
    }

    updateAccount = async (req:Request, res:Response) => {
        const {id} = req.params;
        const updateDto: UpdateOneDto = {
            _id:id,
            update:req.body
        }
        const user = await this.allUsers.UpdateOne(updateDto)
        return res.status(200).json({user});

    }

    getIntegration = async (req:Request, res:Response) => {
         

        return res.status(200).json({
            "integration":[]
        })
    }
    getSettings = async (req:Request, res:Response) => {
         

        return res.status(200).json({
            "settings":[]
        })
    }

    // settings profile
    settingsProfile = async (req:Request, res:Response) => {
        // update profile
        return res.status(200).json({});
    }
    settingsBilling = async (req:Request, res:Response) => {
        // add billing information
        return res.status(200).json({});
    }
    settingsOrders = async (req:Request, res:Response) => {
        return res.status(200).json({});
    }
}

export default new AdminController();