import express, { type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5174"
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
