import FormField from '@/components/ui/formField'
import Message from '@/components/ui/message';
import SubmitButton from '@/components/ui/submitButton';
import type { SignupFormFields } from '@/types';
import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from '@/lib/validations';
const SignupForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupFormFields>({
        resolver: zodResolver(signupSchema)
    });
    const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
        console.log(data);
        reset();
    };
    return (
        <div className='flex items-center flex-col gap-8 border-2 border-black bg-[rgb(10,19,23)] rounded-[8px] p-6'>
            <div className='text-white text-4xl font-bold'>
                Create Your Account
            </div>
            <form className='flex items-center flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <FormField variant='large' placeholder='Username' {...register("username")} minLength={8} maxLength={15} />
                    <Message variant='error'>{errors.username?.message}</Message>
                </div>
                <div className='flex flex-col gap-1'>
                    <FormField variant='large' placeholder='Email' {...register("email")} />
                    <Message variant='error'>{errors.email?.message}</Message>
                </div>
                <div className='flex flex-col gap-1'>
                    <FormField variant='large' placeholder='Password' {...register("password")} minLength={8} maxLength={15} />
                    <Message variant='error'>{errors.password?.message}</Message>
                </div>
                <div className='flex flex-col gap-1'>
                    <FormField variant='large' placeholder='Confirm Password' {...register("confirmPassword")} minLength={8} maxLength={15} />
                    <Message variant='error'>{errors.confirmPassword?.message}</Message>
                </div>

                <SubmitButton onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </SubmitButton>
            </form >
        </div >

    )
}

export default SignupForm