import { CompanyDto } from '../dto/CompanyDto';
import { CompanyRepository } from '../repository/CompanyRepository';
import { ProfileRepository } from '../repository/ProfileRepository';
import { WalletRepository } from '../repository/WalletRepository';
import { UserRepository } from './../repository/UserRepository';
import { AllSeachDto, searchDto } from '../dto/GeneralDto';
import VendorRepository from '../repository/vendorRepository';
import { ProductRepository } from '../repository/ProductRepository';
import { SalesOrderRepository } from '../repository/SalesOrderRepository';


export class VendorService extends VendorRepository{
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private companyRepository: CompanyRepository;
    private walletRepository: WalletRepository;
    private productRepository: ProductRepository;
    private orders:SalesOrderRepository;

    constructor(){
        super();
        this.userRepository =new UserRepository();
        this.profileRepository =new ProfileRepository();
        this.companyRepository = new CompanyRepository();
        this.walletRepository = new WalletRepository();
        this.productRepository = new ProductRepository();
        this.orders = new SalesOrderRepository();
    }

    async createVendor(data: CompanyDto, user: string){
        try {
            const company = await this.companyRepository.Create(data);
            const usertoVendor = await this.userRepository.FindOne({field: '_id', value: user}) 
            const wallet = await this.walletRepository.Create({name: data.name, user: usertoVendor?._id,amount: 0})
            const userUpdate = await this.userRepository.UpdateOne({_id: user,update: {company: company?._id}})

            return {
                company: company,
                wallet: wallet,
                user: userUpdate
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getAllVendors(option?: AllSeachDto){
        try {
            return await this.FindAll(option);
        } catch (error) {
            console.log(error);
        }
    }
    async viewWallet(user: string) {
        try {
            const usertoFind = await this.userRepository.FindOne({field: '_id', value: user}) 
            return await this.walletRepository.FindMany({field: user, value: usertoFind?._id})
        } catch (error) {
            console.log(error);
        }
    }

    async findAllProducts(userid: string){
        try{
            const getuser = await this.userRepository.FindOne({field:'_id', value:userid});
            return await this.productRepository.FindMany({field: 'created_by', value: getuser?._id});
        }catch (error) {
            console.log(error);
        }
    }
    async findOneProduct(id: string){
        const search: searchDto = {
            field: '_id',
            value: id.toString()
          };
        return await this.productRepository.FindOne(search);
    }
    async findAllOrders(userid: string){
        try{
            const getuser = await this.userRepository.FindOne({field:'_id', value:userid});
            return await this.orders.FindMany({field: 'created_by', value: getuser?._id});
        }catch (error) {
            console.log(error);
        }
    }
    async findOneOrder(id:string){
        const search: searchDto = {
            field: '_id',
            value: id.toString()
          };
        return await this.orders.FindOne(search);
    }
    async findAllTransactions(userid: string){
        // Need to find delivery status
        try{
            const getuser = await this.userRepository.FindOne({field:'_id', value:userid});
            return await this.orders.FindMany({field: 'created_by', value: getuser?._id});
        }catch (error) {
            console.log(error);
        }
    }

    async findOneTransaction(id: string){
        const search: searchDto = {
            field: '_id',
            value: id.toString()
          };
        return await this.orders.FindOne(search);
    }
}