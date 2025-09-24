import { SignUp } from '@clerk/clerk-react'
import React from 'react'

export default function Signup() {
  return (
    <SignUp  signInUrl='/login' forceRedirectUrl={'/student'}/>
)
}
