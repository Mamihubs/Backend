import { Request, Response } from "express";
import { VendorService } from "../services/vendor.service";
import { WalletRepository } from "../repository/WalletRepository";
import { WalletDto } from "../dto/WalletDto";
import { UpdateOneDto, searchDto } from "../dto/GeneralDto";
import { storeDataInCacheMemory } from "../interceptors";

const vendorService = new VendorService();
class WalletController {
    private walletRepo: WalletRepository;
    constructor(){
        this.walletRepo = new WalletRepository();
    }
    getUserWallets = async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: true, message: "UserId required to get vendor wallet" })
    
        try {
            // call the service to get wallet using the userid function
            const data = await vendorService.viewWallet(userId)
    
            if (!data)
                return res.status(404).json({
                    error: true,
                    message: "user does not have wallet"
                })
            // store cache in memory
            storeDataInCacheMemory(req, {data, error: false}, 10)
            // return the user information 
            return res.status(200).json({ error: false, data })
        } catch (err) {
            console.log(err)
        }
    
    }

    getWalletById = async(req:Request, res:Response) =>{
        try{
            const {id} = req.params;
            const searchDto: searchDto = {
                field:"user",
                value: id
            }
            const  checkWalletAlreadyExists = await this.walletRepo.FindOne(searchDto);

            if(!checkWalletAlreadyExists){
                return res.status(400).json({
                    status:false,
                    message:"Wallet not found"
                })
            }
            const data = { status: true, data: checkWalletAlreadyExists}
            // store in cache
            storeDataInCacheMemory(req, data, 10)
            return res.status(200).json(data)
        }catch(e){

        }
    }
    fundUserWallet = async(req:Request, res:Response) => {
        try{
            const {user, name, amount} = req.body;
            const walletDto: WalletDto = {
                user,
                name,
                amount
            }
            const searchDto: searchDto = {
                    field:"user",
                    value: user
            }
                const  checkWalletAlreadyExists = await this.walletRepo.FindOne(searchDto);

                if(!checkWalletAlreadyExists){
                    // Wallet do not exist yet so create one
                    const createWallet = await this.walletRepo.Create(walletDto);

                    if(!createWallet){
                        return res.status(400).json({
                            status: false,
                            message: "Wallet could not be created, try again later"
                        })
                    }

                    return res.status(201).json({
                        status:true,
                        message:"Wallet created successfully.",
                        data: createWallet
                    })
                }else{

                    // update the wallet with the amount

                    const updateDto: UpdateOneDto = {
                        _id: checkWalletAlreadyExists['_id'],
                        update:{
                            amount: checkWalletAlreadyExists['amount']+amount
                        }
                    }

                    const updateUserWallet = await this.walletRepo.UpdateOne(updateDto);

                    if(!updateUserWallet){
                        return res.status(400).json({
                            status:false,
                            message:"Wallet could not be funded."
                        })
                    }

                   
                    return res.status(200).json({
                        status:true,
                        message:"Wallet funded successfully.",
                        data: checkWalletAlreadyExists
                    }) 
                }
        }catch(e){
            return res.status(400).json({
                status:false,
                message:"Wallet could not be funded."
            })
        }
    }

    deductFund = async (req:Request, res:Response) =>{
        try{
            const {user, amount} = req.body;
            const searchDto: searchDto = {
                field:"user",
                value: user
        }
            const checkIfEnoughFunds = await this.walletRepo.FindOne(searchDto);

            if(!checkIfEnoughFunds){
                return res.status(400).json({
                    status:false,
                    message:"Wallet could not be found."
                })
            }else{
                if(checkIfEnoughFunds['amount'] > amount){
                    const updateDto: UpdateOneDto = {
                        _id: checkIfEnoughFunds['_id'],
                        update:{
                            amount: checkIfEnoughFunds['amount']-amount
                        }
                    }

                    const updateUserWallet = await this.walletRepo.UpdateOne(updateDto);
                
                    if(!updateUserWallet){
                        return res.status(400).json({
                            status:false,
                            message:"Wallet could not be debited."
                        })
                    }

                   
                    return res.status(200).json({
                        status:true,
                        message:"Wallet debited successfully.",
                        data: checkIfEnoughFunds
                    }) 
                }else{
                    return res.status(400).json({
                        status:false,
                        message:"Insufficient fund in your wallet."
                    })
                }
            }
        }catch(e){
            return res.status(400).json({
                status:false,
                message:"Wallet could not be debited."
            })
        }


    }
}

export default new WalletController();