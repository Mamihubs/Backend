import { BankDto, UpdateBankDto } from "../dto/BankDto";
import { BusinessDto, UpdateBusinessDto } from "../dto/BusinessDto";
import { IdentityCompanyDto, IdentityIndividualDto, UpdateIdentityCompanyDto, UpdateIdentityIndividualDto } from "../dto/IdentityDto";
import BankModel from "../models/Bank";
import BusinessModel from "../models/Business";
import IdentityCompanyModel from "../models/IdentityCompany";
import IdentityIndividualModel from "../models/IdentityIndividual";

export class OnboardingRepository{

    // Business information
    async CreateBusinessInformation(business:BusinessDto){
        try{
            return await BusinessModel.create(business);
        }catch(error){
            console.log(error);
        }
    }

    async UpdateBusinessInformation(business:UpdateBusinessDto){
        try{
            return await BusinessModel.updateOne({_id:business._id}, business.update);
        }catch(error){
            console.log(error);
        }
    }

    // Identity
    async CreateIdentityIndividual(identity:IdentityIndividualDto){
        try{
            return await IdentityIndividualModel.create(identity);
        }catch(error){
            console.log(error);
        }
    }

    async UpdateIdentityIndividual(identity:UpdateIdentityIndividualDto){
        try{
            return await IdentityIndividualModel.updateOne({_id:identity._id}, identity.update);
        }catch(error){
            console.log(error);
        }
    }
    async CreateIdentityCompany(identity:IdentityCompanyDto){
        try{
            return await IdentityCompanyModel.create(identity);
        }catch(error){
            console.log(error);
        }
    }

    async UpdateIdentityCompany(identity:UpdateIdentityCompanyDto){
        try{
            return await IdentityCompanyModel.updateOne({_id:identity._id}, identity.update);
        }catch(error){
            console.log(error);
        }
    }

    // bank
    async CreateBank(bank: BankDto){
        try{
            return await BankModel.create(bank);
        }catch(error){
            console.log(error);
        }
    }
    async UpdateBank(bank: UpdateBankDto){
        try{
            return await BankModel.updateOne({_id:bank._id}, bank.update);
        }catch(error){
            console.log(error);
        }
    }
}