import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import agoraTokenRoute from "./routes/agoraTokenRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//_dirname  ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 7777;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use("/api/agora", agoraTokenRoute);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
// static files
app.use(express.static(path.join(__dirname, "client", "build")));
// catch all route for react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
