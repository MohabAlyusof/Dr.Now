import express from 'express';
import { 
    loginUser, 
    registerUser, 
    getProfile, 
    updateProfile, 
    bookAppointment, 
    listAppointment, 
    cancelAppointment, 
    paymentStripe, 
    verifyStripe, 
    generateAgoraToken // ✅ ضم التوكن هنا مباشرة
} from '../controllers/userController.js';

import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

// ✅ استخدم userRouter بدلاً من router هنا
userRouter.get('/agora/rtc-token', generateAgoraToken);



// باقي المسارات
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-stripe", authUser, paymentStripe);
userRouter.post("/verifyStripe", authUser, verifyStripe);

export default userRouter;