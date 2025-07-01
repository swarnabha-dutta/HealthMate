import React from 'react'

const DoctorProfilePage = async ({ params }) => {
    const { id } = await params;
    try {
        const [doctorData, slotsData] = await Promise.all([
            
        ])
    } catch (error) {
        
    }

  return (
    <div>DoctorProfilePage</div>
  )
}

export default DoctorProfilePage