import { Request, Response } from "express";
import SalesService from "../services/sales.service";

class SalesController {

    private SalesService: SalesService = new SalesService();

    // update sales order 
    updateSalesOrder = async (req: Request, res: Response) => {
        try {
            // data validations
            const updated_by = req.user;
            const { id } = req.params

            if (!req.body)
                return res.status(400).json({
                    error: true,
                    message: "update information required",
                })

            const updated = await this.SalesService.updateSales(id, { ...req.body, updated_by });

            if (!updated)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while updating order information',
                })

            return res.status(200).json({
                error: false,
                message: "sales order created",
                data: updated
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    }


    // delete sales 
    deleteSales = async (req: Request, res: Response) => {
        const { id } = req.params;
        // TODO: delete sales base on user who created it or vendors 
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply sale id" });
            const deleted = this.SalesService.deleteSales({ _id: id });
            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "sales not deleted"
                });

            return res.status(200).json({
                error: false,
                message: "sale deleted"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            });

        }

    }

    // getting  all sales admin
    getSales = async (req: Request, res: Response) => {
        const sales = await this.SalesService.FindAll();
        return res.status(200).json({ sales });
    }

    // getting  all sales for a user
    getUserSales = async (req: Request, res: Response) => {
        try {
            const sales = await this.SalesService.FindAll({ order_by: req.user });
            return res.status(200).json({ sales });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    }

    // get sales based on the status of the sales
    // note the status can be pending, deleivered, etc
    getDeliveryStats = async (req: Request, res: Response) => {
        // const data = await this.SalesService.FindAll({ delivery_status: "pending" });
        if (!req.body.delivery_status)
            return res.status(500).json({
                error: true,
                message: "kindly supply search parameter for the delivery status"
            });

        const sales = await this.SalesService.FindAll(req.body.delivery_status);
        return res.status(200).json({sales});
    }
}

export default new SalesController();