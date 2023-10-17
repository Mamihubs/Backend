import { Request, Response } from "express";

//importing field validations
import { carouselValidation } from "../validations/carouselValidation";
import { CarouselService } from "../services/carousel.service";



class CaroController extends CarouselService{


    constructor(){
        super(); //
    }

    createCarousel = async (req: Request, res: Response) => {
        try {
            // data validations
            const { error } = carouselValidation(req.body);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });
                 
            const carousel = await this.createCaro({...req.body});

            if(!carousel)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while creating user',
                })
    
            return res.status(200).json({
                error: false,
                message: "carousel created",
                data:carousel
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }

    // delete category 
    deleteCarousel = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply carousel id" });
            const deleted = this.deleteCaro({_id:id});

            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "carousel not deleted"
                });

            // return the user information 
            return res.status(200).json({
                error: false,
                message: "carousel deleted"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            }); 
            
        }

    }

    // getting all carousel
    getCarousel = async (req: Request, res: Response) => {
        const data = await this.getAllCarouzel();
        return res.status(200).json(data);
    }
}

export default new CaroController();