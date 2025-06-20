import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import agoraTokenRoute from "./routes/agoraTokenRoute.js";

// app config
const app = express();
app.use((req, res, next) => {
  console.log("origen:", req.headers.origin);
  next();
});
app.use(cors({
  origin:[process.env.CLIENT_URL, process.env.ADMIN_URL],
  credentials: true,
}));
const port = process.env.PORT || 7777;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use("/api/agora", agoraTokenRoute);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
