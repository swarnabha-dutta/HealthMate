"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
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
            <CardTitle>
              <Clock className="h-5 w-5 mr-2 "/>
            </CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
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