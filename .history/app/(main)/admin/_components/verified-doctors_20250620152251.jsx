"use client";



import { updateDoctorActiveStatus } from '@/actions/admin'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/use-fetch'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const VerifiedDoctors = ({doctors}) => {


  const [searchTerm, setSearchTerm] = useState('');
  const [targetDoctor, setTargetDoctor] = useState(null);


  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.speciality.toLowerCase().includes(query) ||
      doctor.email.toLowerCase().includes(query)
    );
  });
  const {
    loading,
    data,
    fn: submitStatusUpdate
  } = useFetch(updateDoctorActiveStatus);

  return (
    <div>
          <Card className="bg-muted/20 border-emerald-900/20">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between   gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-white">
                    Manage Doctors
                </CardTitle>
                <CardDescription>
                    View and manage all verified doctors
                </CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  className="pl-8 bg-background border-emerald-900/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
          {filteredDoctors.length === 0 ? (
            <div className='text-center text-muted-foreground py-8'>
              {searchTerm
              }
            </div>
            ):()}
          </CardContent>
          
      </Card>
    </div>
  )
}

export default VerifiedDoctors  