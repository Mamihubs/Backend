import express, { Request } from "express";
const router = express.Router();
import AuthenticateUser from "../middlewares/authCheck"
import locationController from "../controllers/locationController";
import multer, { diskStorage, FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';

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


router.post("/region", locationController.createRegions);
router.get("/region", locationController.fetchAllRegions);
router.get("/region/:id", locationController.fetchOneRegion);
router.put("/region/:id", locationController.updateOneRegion);

router.post("/", locationController.createLocations);
router.get("/", locationController.fetchAllLocations);
router.get("/:id", locationController.fetchOneLocation);
router.put("/:id", locationController.updateOneLocation);
router.post("/import", upload.single('csvFile'), locationController.bulkUploadLocation);


export default router;