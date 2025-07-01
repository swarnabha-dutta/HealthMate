"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
import useFetch from '@/hooks/use-fetch';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AvailabilitySettings = ({slots}) => {

  const [showForm,setShowForm] = useState(false);
  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);
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
    
  )
}

export default AvailabilitySettings