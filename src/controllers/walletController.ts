import { Request, Response } from "express";
import { VendorService } from "../services/vendor.service";

const vendorService = new VendorService();
class WalletController {
    getUserWallets = async (req: Request, res: Response) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: true, message: "UserId required to get vendor wallet" })
    
        try {
            // call the service to get wallet using the userid function
            const data = await vendorService.viewWallet(userId)
    
            if (!data)
                return res.status(400).json({
                    error: true,
                    message: "user does not have wallet"
                })
    
            // return the user information 
            return res.status(200).json({
                error: false,
                data
            })
        } catch (err) {
            console.log(err)
        }
    
    }
}

export default new WalletController();