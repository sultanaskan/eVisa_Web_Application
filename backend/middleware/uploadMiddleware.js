import path from 'path';
import fs from 'fs';
import multer from 'multer';

console.log("inside the multer");

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    const dir = './uploads/visa-documents';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Naming pattern: visa-doc-[field]-[timestamp].[ext]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `visa-doc-${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });