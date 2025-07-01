"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
import { CardHeader } from "@/components/ui/card";
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
    <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white  flex items-center">
                <Clock className="h-5 w-5 mr-2 text-emerald-400" />
                Availability
            </CardTitle>
            <CardDescription>Card Description</CardDescription>
            
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
    </Card>
  )
}

export default AvailabilitySettings