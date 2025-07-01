import React from 'react'

const VideoCallPage = async ({ searchParams }) => {
    
    const { sessionId, token } = await searchParams();
  return (
      <VideoCall sessionid={sessiond} token={token} />
  )
}

export default VideoCallPage