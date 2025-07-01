import { getCurrentUser } from '@/actions/onboarding'
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'

const page =async () => {


    const user = await getCurrentUser();


    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }
  return (
    <div>page</div>
  )
}

export default page