"use client";


import React from 'react'
import { useForm } from 'react-hook-form';

const AvailabilitySettings = ({slots}) => {

  const { register}=useForm({
    defaultValues: {
      startTime: "",
      endTime:"",
    }
  })









  return (
    <div>AvailabilitySettings</div>
  )
}

export default AvailabilitySettings