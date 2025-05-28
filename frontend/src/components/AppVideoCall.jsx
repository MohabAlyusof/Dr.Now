import React, { useEffect, useRef, useState, useContext } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

function AppVideoCall({ channel, uid, onClose }) {
  const [joined, setJoined] = useState(false);
  const localVideoRef = useRef(null);
  const { token } = useContext(AppContext); // Token from context

  const appId = import.meta.env.VITE_AGORA_APP_ID;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchTokenAndStartCall = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/agora/rtc-token?channel=${channel}&uid=${uid}`, {
        headers: { token }, // Use token from context
      });

      const rtcToken = res.data.token; // ✅ Use a different variable name to avoid conflict

      if (!rtcToken) {
        console.error("❌ Token not received from server.");
        return;
      }

      await startCall(rtcToken);
    } catch (error) {
      console.error("❌ Failed to fetch token:", error);
    }
  };

  const startCall = async (rtcToken) => {
    try {
      if (!appId) {
        console.error("❌ Missing Agora App ID.");
        return;
      }

      await client.join(appId, channel, rtcToken, uid);

      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

      if (localVideoRef.current) {
        cameraTrack.play(localVideoRef.current);
      }

      await client.publish([microphoneTrack, cameraTrack]);

      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
          const remoteContainer = document.createElement('div');
          remoteContainer.id = `remote-${user.uid}`;
          remoteContainer.style.width = '320px';
          remoteContainer.style.height = '240px';
          remoteContainer.style.margin = '5px';

          const remoteStreams = document.getElementById('remote-streams');
          if (remoteStreams) {
            remoteStreams.appendChild(remoteContainer);
            user.videoTrack.play(remoteContainer);
          }
        }
      });

      client.on('user-unpublished', (user) => {
        const remoteContainer = document.getElementById(`remote-${user.uid}`);
        if (remoteContainer) remoteContainer.remove();
      });

      setJoined(true);
    } catch (error) {
      console.error('❌ Error starting call:', error);
    }
  };

  const leaveCall = async () => {
    await client.leave();
    setJoined(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (channel && uid && !joined) {
      fetchTokenAndStartCall();
    }

    return () => {
      leaveCall();
    };
  }, [channel, uid]);

  return (
    <div className="p-4 border rounded bg-white shadow-lg">
      <h3 className="text-lg font-semibold mb-2">📞 Live Video Session</h3>
      <div className="flex gap-4 flex-wrap">
        <div 
          ref={localVideoRef} 
          className="w-full sm:w-1/2 h-64 bg-black text-white flex items-center justify-center"
        >
          <p>Local Video</p>
        </div>
        <div 
          id="remote-streams" 
          className="w-full sm:w-1/2 h-64 bg-gray-800 text-white flex items-center justify-center"
        >
          <p>Remote Videos</p>
        </div>
      </div>
      <button 
        onClick={leaveCall} 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        End Call
      </button>
    </div>
  );
}

export default AppVideoCall;
