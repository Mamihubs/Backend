import { CompanyDto } from '../dto/CompanyDto';
import { CompanyRepository } from '../repository/CompanyRepository';
import { ProfileRepository } from '../repository/ProfileRepository';
import { WalletRepository } from '../repository/WalletRepository';
import { UserRepository } from './../repository/UserRepository';


export class VendorService{
    private userRepository: UserRepository;
    private profileRepository: ProfileRepository;
    private companyRepository: CompanyRepository;
    private walletRepository: WalletRepository;

    constructor(){
        this.userRepository =new UserRepository();
        this.profileRepository =new ProfileRepository();
        this.companyRepository = new CompanyRepository();
        this.walletRepository = new WalletRepository();
    }

    async createVendor(data: CompanyDto, user: string){
        try {
            const company = await this.companyRepository.Create(data);
            const wallet = await this.walletRepository.Create({name: data.name, company: company?._id,amount: 0})
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
}