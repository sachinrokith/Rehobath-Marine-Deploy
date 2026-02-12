import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Clean up old temp files on startup
const cleanupTempFiles = () => {
  const tempDir = join(__dirname, '../temp');
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) return;
      
      files.forEach(file => {
        const filePath = join(tempDir, file);
        fs.unlink(filePath, () => {}); // Async delete, ignore errors
      });
    });
  }
};

// Run cleanup on module load
cleanupTempFiles();

// Configure storage for uploaded files (temporary storage for Base64 conversion)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = join(__dirname, '../temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      try {
        fs.mkdirSync(tempDir, { recursive: true });
        console.log('Created temp directory:', tempDir);
      } catch (error) {
        console.error('Failed to create temp directory:', error);
        return cb(error);
      }
    }
    
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'temp-' + uniqueSuffix + '-' + file.originalname);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  // Accept common image file types
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default upload;
