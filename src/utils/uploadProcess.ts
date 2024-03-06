import { Request } from "express";
import multer, { FileFilterCallback, StorageEngine, diskStorage } from "multer";
import path from "path";

const storageProduct: StorageEngine = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, './uploads/product-images/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
const storageDocument: StorageEngine = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, './uploads/document-image/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
const storagePassport: StorageEngine = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, './uploads/passport-image/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  // File validation
  const fileFilter: multer.Options['fileFilter'] = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true); // Accept file
    } else {
      req.attemptedFileUpload = true;
      cb(null, false); // Reject file
    }
  };


  const uploadProduct = multer({
    storage:storageProduct,
    limits: {
      fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
    },
    fileFilter
  });

  const uploadDocument = multer({
    storage:storageDocument,
    limits: {
      fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
    },
    fileFilter
  });

  const uploadPassport = multer({
    storage:storagePassport,
    limits: {
      fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
    },
    fileFilter
  });


export default {uploadPassport, uploadDocument, uploadProduct}