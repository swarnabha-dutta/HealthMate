import React, { useState } from 'react'

const VideoCall = ({ sessionId, token }) => {
    
    // state managements of video call
    
    // 1. loading state while initializing
    const [isLoading, setIsLoading] = useState(true);
    // 2.Track if Vonage script is loaded
    const [scriptLoaded, setScriptedLoaded] = useState(false);
    // 3. 
    const [isConnected, setIsConneced] = useState(false);






  return (
    <div>VideoCall</div>
  )
}

export default VideoCall