import { Request, Response } from "express";
import {VendorService}  from "../services/vendor.service";
import { UserStatus, UserType } from "../models/User";

class VendorsController{

    private vendorService: VendorService = new VendorService();

    // getting  all vendors
    getVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors();
        return res.status(200).json(data);
    }

    // get pending vendors
    getPendingVendors = async (req: Request, res: Response) => {
        const data = await this.vendorService.getAllVendors({ status: UserStatus.PENDING, type:UserType.VENDOR});
        return res.status(200).json(data);
    }
}

export default new VendorsController();