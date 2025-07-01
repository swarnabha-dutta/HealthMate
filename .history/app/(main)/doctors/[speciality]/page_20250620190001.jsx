import { getDoctorBySpeciality } from '@/actions/doctors-listing';
import PageHeader from '@/components/page-header';
import { redirect } from 'next/navigation';
import React from 'react'

const SpecialityPage =async ({ params }) => {
  const { speciality } = await params; 
  if (!speciality) {
    redirect("/doctors");
  }

  const { doctors, error } = await getDoctorBySpeciality(speciality);

  if (error) {
    console.error("")
  }
  return (
    <div>
      <PageHeader title={speciality.split("%20").join(" ")}
        backLink="/doctors"
        backLabel="ALL Specialties"
      />
  
    
  </div>
  )
}

export default SpecialityPage;
