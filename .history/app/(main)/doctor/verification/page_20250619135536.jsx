import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const VerificationPage =async () => {
  
    const user = await getCurrentUser();
    if(user?)
  
    return (
    <div>VerificationPage</div>
  )
}

export default VerificationPage