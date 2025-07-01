import React from 'react'

const SpecialityPage =async ({ params }) => {
  const { specialty } = await  params; // not `specialty` (match folder name)
  return <div>SpecialityPage : {speciality}</div>
}

export default SpecialityPage;
