import React from 'react'
import SignupHeader from './SignupHeader'
import SignupForm from './SignupForm'

const SignupPage = () => {
    return (
        <div className='flex items-center flex-col gap-4 pt-16'>
            <SignupForm />
        </div>
    )
}

export default SignupPage