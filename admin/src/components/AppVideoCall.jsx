import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

function AppVideoCall({ channel, uid, token, onClose }) {
  const [joined, setJoined] = useState(false);
  const localVideoRef = useRef(null);
  const clientRef = useRef(null);
  const appId = import.meta.env.VITE_AGORA_APP_ID;

  const startCall = async (rtcToken) => {
    try {
      if (!appId) {
        console.error("❌ Missing Agora App ID.");
        return;
      }

      console.log("🎥 Starting Agora Call with:", { appId, channel, uid, rtcToken });

      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      await client.join(appId, channel, rtcToken, uid);
      console.log("✅ Joined channel:", channel);

      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
console.log("🎤 Microphone track:", microphoneTrack);
console.log("📸 Camera track:", cameraTrack);
      if (localVideoRef.current) {
        cameraTrack.play(localVideoRef.current);
        console.log("📸 Playing local video");
      }

      await client.publish([microphoneTrack, cameraTrack]);
      console.log("📡 Published local tracks");

      client.on("user-published", async (user, mediaType) => {
        console.log("📥 User published:", user.uid, "type:", mediaType);
        await client.subscribe(user, mediaType);

        if (mediaType === "video" && user.videoTrack) {
          const remoteWrapper = document.getElementById("remote-stream");
          let remoteContainer = document.getElementById(`remote-${user.uid}`);
          if (!remoteContainer) {
            remoteContainer = document.createElement("div");
            remoteContainer.id = `remote-${user.uid}`;
            remoteContainer.className = "w-full h-full";
            if (remoteWrapper) {
              remoteWrapper.appendChild(remoteContainer);
            }
          }
          user.videoTrack.play(remoteContainer);
          console.log("🎬 Playing remote video:", user.uid);
        }

        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user) => {
        console.log("❌ User unpublished:", user.uid);
        const remoteContainer = document.getElementById(`remote-${user.uid}`);
        if (remoteContainer) remoteContainer.remove();
      });

      setJoined(true);
    } catch (error) {
      console.error("❌ Error starting call:", error);
      alert("Failed to access camera/microphone. Please allow permissions.");
    }
  };

  const leaveCall = async () => {
    if (clientRef.current) {
      await clientRef.current.leave();
      clientRef.current.removeAllListeners();
    }
    setJoined(false);
    if (onClose) onClose();
    console.log("📴 Left the channel");
  };

  useEffect(() => {
    console.log("🔁 useEffect triggered", { channel, uid, token, joined });
    if (channel && uid && token && !joined) {
      startCall(token);
    }
    return () => {
      leaveCall();
    };
  }, [channel, uid, token]);

  return (
    <div className="w-full text-center">
      <h3 className="text-xl font-bold text-[#126A9C] mb-2">
        📞 Live Video Consultation
      </h3>
      <div className="text-sm text-gray-500 mb-4">
        {joined ? "🟢 Connected" : "🔄 Connecting..."}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative h-64 sm:h-80">
          <div className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            You
          </div>
          <div ref={localVideoRef} className="w-full h-full" />
        </div>

        <div id="remote-stream" className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative h-64 sm:h-80">
          <div className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            Partner
          </div>
        </div>
      </div>

      <button
        onClick={leaveCall}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
      >
        End Call
      </button>
    </div>
  );
}

export default AppVideoCall;
