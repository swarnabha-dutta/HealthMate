"use client";


import React from 'react'
import { useForm } from 'react-hook-form';

const AvailabilitySettings = ({slots}) => {


  const {loading,fn:submit}
  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm({
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