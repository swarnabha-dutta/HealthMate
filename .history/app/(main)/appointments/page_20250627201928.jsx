import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const page = () => {


    const user = await getCurrentUser();
  return (
    <div>page</div>
  )
}

export default page