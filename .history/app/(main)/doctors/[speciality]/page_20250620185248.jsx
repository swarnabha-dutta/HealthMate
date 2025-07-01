import PageHeader from '@/components/page-header';
import React from 'react'

const SpecialityPage =async ({ params }) => {
  const { speciality } = await params; 
  


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
