"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useRef, useState } from 'react'

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

    const sessionRef = useRef(null);//storing the vonage session 
    const publisherRef = useRef(null);//to store our object of  our video stream like video call or audio call,connect the call , disconnect the call  

    const router = useRouter();

    const applicationId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;




    // Handle successful loading of vonage Video API script
    const handleScriptLoad = () => {
        setScriptLoaded(true);
        // Check if Vonage OT(OpenTok) Object  is available

        if (!window.OT) {
            toast.error("Failed to load Vonage Video API");
            setIsLoading(false);
            return;
        }
        // Initialize the video session once script is loaded
        initializeSession();
    }
    if (!sessionId || !token || !applicationId) {
        return (
            <div>
                <h1>
                    Invalid Video Call
                </h1>
                <p>
                    Missing required parameters for the video call.
                </p>
                <Button
                onClick={() => router.push("/appointments")}
                className="bg-emerald-600 hover:bg-emerald-700"
                
                >Back To Appointments</Button>
            </div>
        )
    }

    const initializeSession = () => {
        
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