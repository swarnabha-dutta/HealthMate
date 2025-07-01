"use client"

import React, { useState } from 'react'

const PendingDoctors = ({doctors}) => {

const {
  loading,
  data,
  fn:submitStatus
}


  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <div>PendingDoctors</div>
  )
}

export default PendingDoctors