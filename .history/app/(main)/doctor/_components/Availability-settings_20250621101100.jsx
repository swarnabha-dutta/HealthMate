"use client";

import {setAvailabilitySlots} from "@/actions/doctor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useFetch from '@/hooks/use-fetch';
import { Clock, Plus } from "lucide-react";
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
        {!showForm
          ? (
            <>

              <Button
              onClick={()=>setShowForm(true)}
              className={"w-full bg-emerald-600 hover:bg-emerald-700"}
              >
                <Plus className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
            </>
            ) : (
            <form className="space-y-4 border border-emerald-900/20 rounded-md p-4">
              <h3 className="text-lg font-medium text-white mb-2">
              Set Daily Availability
              </h3>
              <div>
                <div><Label</div>
              </div>
          </form>
        )}
          </CardContent>
    </Card>
  )
}

export default AvailabilitySettings