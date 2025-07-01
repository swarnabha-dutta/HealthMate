import React from 'react'

const VideoCallPage = async ({ searchParams }) => {
    
    const { sessionid, token } = await searchParams();
  return (
      <VideoCall sessionid={sessionid}  />
  )
}

export default VideoCallPage