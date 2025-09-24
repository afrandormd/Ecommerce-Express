import multer from "multer";
import path from "path";

// Local storage for development
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // ensure that the 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `product-${Date.now()}${ext}`; // eg: product-3823344.png
    cb(null, filename);
  },
});

// Memory storage for production (temporary)
const memoryStorage = multer.memoryStorage();

// Conditional storage based on NODE_ENV
const storage =
  process.env.NODE_ENV === "production"
    ? memoryStorage // Save it to memeroy first, thent upload it manually to Cloudinary
    : localStorage;

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  // Just allow types JPEG/JPG/PNG
  fileFilter: (req, file, cb) => {
    // ✅ Simplified approach
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type: ${file.mimetype}. Only images are allowed.`,
        ),
      );
    }
  },
});

export default upload;
