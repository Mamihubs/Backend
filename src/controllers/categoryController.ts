import { Request, Response } from "express";

//importing field validations
import { categoryValidation } from "../validations/categoryValidation";
import { CategoryService } from "../services/category.service";
import { storeDataInCacheMemory } from "../interceptors";



class CategoryController extends CategoryService{


    constructor(){
        super(); //
    }

    createCategories = async (req: Request, res: Response) => {
        try {
            // data validations
            const createdBy = req.user;
            const { error } = categoryValidation(req.body);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });
                 
            const category = await this.createCategory({...req.body, createdBy});

            if(!category)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while creating user',
                })
    
            return res.status(200).json({
                error: false,
                message: "category created",
                data:category
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }

    updateCategories = async (req: Request, res: Response) => {
        try {
            // data validations
            const updatedBy = req.user;
            const {id} = req.params;
            
            // checking id and updateBy
            if (!(id && updatedBy)) return res.status(400).json({ error: true, message: "please supply category id" })
            
            // error checks for the input fields
            const { error } = categoryValidation(req.body);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                })

            // calling the update category function
            const updatedCategory = await this.updateCategory(id.toString(), {...req.body, updatedBy});
            if(!updatedCategory)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while updating category',
                })
            
            return res.status(200).json({
                error: false,
                message: "category updated",
                data:updatedCategory
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }



    // delete category 
    deleteCategry = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply category id" });
            const deleted = this.deleteCategory({_id:id});

            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "category not deleted"
                });

            // return the user information 
            return res.status(200).json({
                error: false,
                message: "user's profile deleted"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            }); 
            
        }

    }

    // getting all categories
    getCategories = async (req: Request, res: Response) => {
        const data = await this.getAllCategories();
        // save a cached copy
        storeDataInCacheMemory(req, data, 10)
        return res.status(200).json(data);
    }

    //getting all sub categories under a category
    getSubCategories = async (req:Request, res:Response) =>{
        const {id} = req.params;
        try {
            const data = await this.getAllSubCategoriesUnderACategory(id)
            // save a cached copy
            storeDataInCacheMemory(req, data, 10)
            return res.status(200).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }
}

export default new CategoryController();