import React, { useState } from 'react'

const VideoCall = ({ sessionId, token }) => {
    
    // state managements of video call
    
    // 1. loading state while initializing
    const [isLoading, setIsLoading] = useState(true);
    // 2.Track if Vonage script is loaded
    const [scriptLoaded, setScriptedLoaded] = useState(false);
    // 3. Connection status to 
    const [isConnected, setIsConnected] = useState(false);






  return (
    <div>VideoCall</div>
  )
}

export default VideoCall