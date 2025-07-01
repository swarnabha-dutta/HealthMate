"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
import useFetch from '@/hooks/use-fetch';
import React from 'react'
import { useForm } from 'react-hook-form';

const AvailabilitySettings = ({slots}) => {

  const [showFor]
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
    <div>AvailabilitySettings</div>
  )
}

export default AvailabilitySettings