import multer, { diskStorage, FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

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
    cb(null, './uploads/product-images/');
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


const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5  // Limit file size to 5MB
  },
  fileFilter
});

export default upload;
