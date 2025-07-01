"use client"

import { updateDoctorStatus } from '@/actions/admin';
import useFetch from '@/hooks/use-fetch';
import React, { useState } from 'react'

const PendingDoctors = ({doctors}) => {

  const {
    loading,
    data,
    fn: submitStatusUpdate
  } = useFetch(updateDoctorStatus);


  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <div>
      <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
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
    </div>
  )
}

export default PendingDoctors