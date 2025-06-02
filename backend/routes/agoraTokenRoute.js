import express from "express";
import pkg from "agora-access-token";
const { RtcTokenBuilder, RtcRole } = pkg;
import authUser from "../middleware/authUser.js";
const router = express.Router();

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

router.get("/rtc-token", authUser, (req, res) => {
  const { channel, uid } = req.query;

  if (!channel || !uid) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Missing 'channel' or 'uid' parameter.",
      });
  }

  try {
    const role = RtcRole.PUBLISHER;
    const expireTime = 3600;
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channel,
      parseInt(uid),
      role,
      privilegeExpiredTs
    );

    return res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Error generating token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate token." });
  }
});

export default router;
