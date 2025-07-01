"use client";

import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

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
        console.log("SessionId : ", sessionId);
        console.log("token : ", token);
        console.log("applicationId : ", applicationId);


        return (
            <div className='container mx-auto px-4 py-12 text-center'>
                <h1 className='text-3xl font-bold  text-white mb-4'>
                    Invalid Video Call
                </h1>
                <p className='text-muted-foreground mb-6'>
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
        if (!applicationId || !sessionId || !token) {
            toast.error("Missing Required video call parameters");
            router.push("/appointments");
            return;
        }

        try {
            sessionRef.current = window.OT.initSession(applicationId, sessionId);


            sessionRef.current.on("streamCreated", (event) => {
                sessionRef.current.subscribe(
                    event.stream,
                    "subscriber", {
                    insertMode: "append",
                    width: "100%",
                    height: "100%"
                },
                    (error) => {
                        if (error) {
                            toast.error("Error Connecting to other participant's Stream");
                        }
                    }
                );
            });
            sessionRef.current.on("sessionConnected", () => {
                setIsConnected(true);
                setIsLoading(false);


                publisherRef.current = window.OT.initPublisher("publish", {
                    insertMode: "replace",
                    width: "100%",
                    height: "100%",
                    publishAudio: isAudioEnabled,
                    publishVideo: isVideoEnabled
                },
                    (error) => {
                        if (error) {
                            console.error("Publisher error:", error);
                        } else {
                            console.log("Publisher initialized successfully - you should see your video now");
                        }
                    }
                )
            });
            // Connect to the session
            sessionRef.current.connect(token, (error) => {
                if (error) {
                    toast.error("Error connecting to video session");
                } else {
                    // Publish your stream AFTER connecting
                    if (publisherRef.current) {
                        sessionRef.current.publish(publisherRef.current, (error) => {
                            if (error) {
                                console.log("Error publishing stream:", error);
                                toast.error("Error publishing your stream");
                            } else {
                                console.log("Stream published successfully");
                            }
                        });
                    }
                }
            });
            sessionRef.current.on("sessionDisconnected", () => {
                setIsConnected(false);
            });
        } catch (error) {
            toast.error("Failed to initialize video call");
            setIsLoading(false);
        }
    };


    // Toggle Video Call 
    const toggleVideo = () => {
        if (publisherRef.current) {
            publisherRef.current.publishVideo(!isVideoEnabled);
            setIsVideoEnabled((prev) => !prev);
        }
    };

    // Toggle Audio 
    const toggleAudio = () => {
        if (publisherRef.current) {
            publisherRef.current.publishAudio(!isAudioEnabled);
            setIsAudioEnabled((prev) => !prev);
        }
    }

    // end Call 
    const endCall = () => {
        
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
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Video Consultation
                </h1>
                <p className="text-muted-foreground">
                    {isConnected
                    ? "Connected"
                    : isLoading
                        ? "Connecting..."
                        : "Connection failed"}
                </p>
                </div>
            </div>
        </>
    )
}

export default VideoCall