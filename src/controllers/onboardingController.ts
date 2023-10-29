import { Request, Response } from "express";
import { BankDto, UpdateBankDto } from "../dto/BankDto";
import { BusinessDto, UpdateBusinessDto } from "../dto/BusinessDto";
import { IdentityCompanyDto, IdentityIndividualDto, UpdateIdentityCompanyDto, UpdateIdentityIndividualDto } from "../dto/IdentityDto";
import { OnboardingRepository } from "../repository/OnboardingRepository";

export class OnboardingController{
    private onboardingRepo:OnboardingRepository = new OnboardingRepository();

    createBusinessInformation = async(req:Request, res:Response)=>{
        try{
            // const business: BusinessDto = {
            //     user:req.body.user,
            //     account_type:req.body.account_type,
            //     business_registered:req.body.business_registered,
            //     document:req.body.document,
            //     firstname:req.body.firstname,
            //     lastname:req.body.lastname,
            //     middlename:req.body.middlename,
            //     registered_date:req.body.registered_date,
            //     zip:req.body.zip,
            //     referral_code:req.body.referral_code === undefined ?'':req.body.referral_code
            // }
          
            const businessInformation = await this.onboardingRepo.CreateBusinessInformation({
                ...req.body,
                document:Array.isArray(req.files)
                ? req.files.map(
                    (file: Express.Multer.File) => `document-image/${file.filename}`
                  )
                : ''
            });

            return res.status(201).json({businessInformation});
        }catch(error){

        }
    }
    updateBusinessInformation = async(req:Request, res:Response)=>{
        try{
            const {id} = req.params;

            const business: UpdateBusinessDto = { 
                _id:id,
                update:req.body
            }
            const businessInformation = await this.onboardingRepo.UpdateBusinessInformation(business);

            return res.status(200).json({businessInformation});
        }catch(error){

        }
    }
    // identity individual
    createIdentityIndividual = async(req:Request, res:Response)=>{
        try{
            const identity: IdentityIndividualDto = {
                user:req.body.user,
                institute_name:req.body.institute_name,
                graduation_date:req.body.graduation_date,
                identity_card:req.body.identity_card,
                passport:req.body.passport
            }
            const identityIndividual = await this.onboardingRepo.CreateIdentityIndividual({
                ...req.body,
                identity_card:Array.isArray(req.files)
                ? req.files.map(
                    (file: Express.Multer.File) => `document-image/${file.filename}`
                  )
                : '',
                passport:Array.isArray(req.files)
                ? req.files.map(
                    (file: Express.Multer.File) => `passport-image/${file.filename}`
                  )
                : ''
            });

            return res.status(201).json({identityIndividual});
        }catch(error){

        }
    }
    updateIdentityIndividual = async(req:Request, res:Response)=>{
        try{
            const {id} = req.params;

            const identity: UpdateIdentityIndividualDto = { 
                _id:id,
                update:req.body
            }
            const businessInformation = await this.onboardingRepo.UpdateIdentityIndividual(identity);

            return res.status(200).json({businessInformation});
        }catch(error){

        }
    }

    // identity company
    createIdentityCompany = async(req:Request, res:Response)=>{
        try{
            const identity: IdentityCompanyDto = {
                user:req.body.user,
                address:req.body.address,
                company_name:req.body.company_name,
                company_size:req.body.company_size,
                document_type:req.body.document_type,
                manager_number:req.body.manager_number,
                identity_card:req.body.identity_card,
                passport:req.body.passport
            }
            const identityIndividual = await this.onboardingRepo.CreateIdentityCompany({
                ...req.body,
                identity_card:Array.isArray(req.files)
                ? req.files.map(
                    (file: Express.Multer.File) => `document-image/${file.filename}`
                  )
                : '',
                passport:Array.isArray(req.files)
                ? req.files.map(
                    (file: Express.Multer.File) => `passport-image/${file.filename}`
                  )
                : ''
            });

            return res.status(201).json({identityIndividual});
        }catch(error){

        }
    }
    updateIdentityCompany = async(req:Request, res:Response)=>{
        try{
            const {id} = req.params;

            const identity: UpdateIdentityCompanyDto = { 
                _id:id,
                update:req.body
            }
            const businessInformation = await this.onboardingRepo.UpdateIdentityCompany(identity);

            return res.status(200).json({businessInformation});
        }catch(error){

        }
    }

    // Bank
    createBank = async(req:Request, res:Response)=>{
        try{
            const bank: BankDto = {
                user:req.body.user,
                account_name:req.body.account_name,
                account_number:req.body.account_number,
                account_type:req.body.account_type,
                bank_name:req.body.bank_name,
                bank_branch:req.body.bank_branch,
                bank_swiftcode:req.body.bank_swiftcode
            }
            const bankDetails = await this.onboardingRepo.CreateBank(bank);

            return res.status(201).json({bankDetails});
        }catch(error){

        }
    }
    updateBank = async(req:Request, res:Response)=>{
        try{
            const {id} = req.params;

            const bank: UpdateBankDto = { 
                _id:id,
                update:req.body
            }
            const bankDetails = await this.onboardingRepo.UpdateBank(bank);

            return res.status(200).json({bankDetails});
        }catch(error){

        }
    }
}



export default new OnboardingController;