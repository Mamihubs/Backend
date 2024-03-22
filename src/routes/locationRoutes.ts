import express, { Request } from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/authCheck"
import locationController from "../controllers/locationController";
import multer, { diskStorage, FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';
import { cacheInterceptor } from "../interceptors";

declare global {
    namespace Express {
      interface Request {
        attemptedFileUpload?: boolean;
      }
    }
}

// Configure storage
const storage: StorageEngine = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, './');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
// File validation
const fileFilter: multer.Options['fileFilter'] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
if (file.mimetype === 'text/csv') {
    cb(null, true); // Accept file
} else {
    req.attemptedFileUpload = true;
    cb(null, false); // Reject file
}
};
  
  
const upload = multer({
storage,
limits: {
    fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
},
fileFilter
});


/**
 * @swagger
 * /api/locations/region:
 *   post:
 *     tags: [Location]
 *     description: Add a new region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name: 
 *                type: string
 *              
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/RegionResponse'
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/region", locationController.createRegions);

/**
 * @swagger
 * /api/locations/region:
 *   get:
 *     tags: [Location]
 *     description: Get all regions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RegionResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/region", cacheInterceptor, locationController.fetchAllRegions);

/**
 * @swagger
 * /api/locations/region/{id}/:
 *   get:
 *     tags: [Location]
 *     description: Get a specific region
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the region to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                     $ref: '#/components/schemas/RegionResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/region/:id", cacheInterceptor, locationController.fetchOneRegion);


/**
 * @swagger
 * /api/locations/region/{id}:
 *   put:
 *     tags: [Location]
 *     description: Update region
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the region to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name: 
 *                type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/RegionResponse'
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.put("/region/:id", locationController.updateOneRegion);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     tags: [Location]
 *     description: Add a new location to the region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              region: 
 *                type: string
 *              location: 
 *                type: string
 *              address: 
 *                type: string
 *              phoneNo: 
 *                type: string
 *              
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/LocationResponse'
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/", locationController.createLocations);

/**
 * @swagger
 * /api/locations:
 *   get:
 *     tags: [Location]
 *     description: Get all locations
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LocationResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/", cacheInterceptor, locationController.fetchAllLocations);

/**
 * @swagger
 * /api/locations/{id}/:
 *   get:
 *     tags: [Location]
 *     description: Get a specific location
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the location to be retrieved
 *        
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                     $ref: '#/components/schemas/LocationResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/:id", cacheInterceptor, locationController.fetchOneLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     tags: [Location]
 *     description: Update location
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *              type: string
 *       description: ID of the location to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              region: 
 *                type: string
 *              location: 
 *                type: string
 *              address: 
 *                type: string
 *              phoneNo: 
 *                type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                      status:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                      data:
 *                          $ref: '#/components/schemas/LocationResponse'
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.put("/:id", locationController.updateOneLocation);

/**
 * @swagger
 * /api/locations/import:
 *   post:
 *     tags: [Location]
 *     description: Upload multiple locations in a single file
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *              csvFile:
 *                 type: string
 *                 format: binary     
 *     
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LocationResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/import", upload.single('csvFile'), locationController.bulkUploadLocation);


export default router;