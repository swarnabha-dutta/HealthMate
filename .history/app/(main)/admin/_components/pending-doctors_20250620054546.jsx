"use client"

import useFetch from '@/hooks/use-fetch';
import React, { useState } from 'react'

const PendingDoctors = ({doctors}) => {

const {
  loading,
  data,
  fn: submitStatusUpdate
} = useFetch(upda)


  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <div>PendingDoctors</div>
  )
}

export default PendingDoctors