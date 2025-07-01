"use client";

import React, { useState } from 'react'

const VideoCall = ({ sessionId, token }) => {
    
    // state managements of video call
    
    // 1. loading state while initializing
    const [isLoading, setIsLoading] = useState(true);
    // 2.Track if Vonage script is loaded
    const [scriptLoaded, setScriptLoaded] = useState(false);
    // 3. Connection status to video session
    const [isConnected, setIsConnected] = useState(false);
    // 4. Video on/Off state
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    // 5.Audio on/off
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);




  return (
      <>
          




        </>
  )
}

export default VideoCall