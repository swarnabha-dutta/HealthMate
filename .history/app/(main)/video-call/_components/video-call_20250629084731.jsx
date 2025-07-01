"use client";

import Script from 'next/script';
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



    // Handle successful loading of vonage Video API script
    const handleScriptLoad = () => {
        setScriptLoaded(true);
        // Check if Vonage OT(OpenTok) is available

        if (!window.OT) {
            toast.error("Failed to load Vonage Video API");
            setIsLoading(false);
            return;
        }
        // Initialize the video session once  
    }

    return (
        <>
            <Script
                src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
                onLoad={handleScriptLoad}
                onError={() => {
                    toast.error("Failed to load video call script");
                    setIsLoading(false);
                }}
            />  
        </>
    )
}

export default VideoCall