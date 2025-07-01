"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from '@/hooks/use-fetch';
import { Clock } from "lucide-react";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AvailabilitySettings = ({slots}) => {

  const [showForm,setShowForm] = useState(false);
  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    }
  });


  return (
    <Card className={"border-emerald-900/20"}>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white  flex items-center">
                <Clock className="h-5 w-5 mr-2 text-emerald-400" />
                Availability
            </CardTitle>
            <CardDescription>
              Set your availability for patient appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
        {!showForm ? <>
        </> : <form></form>}
          </CardContent>
    </Card>
  )
}

export default AvailabilitySettings