import PageHeader from '@/components/page-header';
import React from 'react'

const SpecialityPage =async ({ params }) => {
  const { speciality } = await  params; // not `specialty` (match folder name)
  return <div><PageHeader title={speciality.split("%20").join(" ")}
  
  /></div>
}

export default SpecialityPage;
