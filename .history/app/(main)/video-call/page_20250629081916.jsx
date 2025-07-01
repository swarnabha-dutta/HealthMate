import React from 'react'

const VideoCallPage = async ({ searchParams }) => {
    
    const { sessionId, token } = await searchParams();
  return (
      <VideoCall sessionid={sessionid} token={token} />
  )
}

export default VideoCallPage