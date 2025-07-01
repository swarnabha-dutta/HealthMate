import React from 'react'
import VideoCall from './_components/video-call';

const VideoCallPage = async ({ searchParams }) => {
    
    const { sessionId, token } = await searchParams;
  return (
      <VideoCall sessionid={sessionId} token={token} />
  )
}

export default VideoCallPage