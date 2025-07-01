import React from 'react'

const VideoCallPage = async ({ searchParams }) => {
    
    const { sessionId, token } = await searchParams();
  return (
      <VideoCall sessionid={sessionId} token={token} />
  )
}

export default VideoCallPage