import FormField from '@/components/ui/formField'
import Message from '@/components/ui/message';
import Button from '@/components/ui/button';
import type { SignupFormFields } from '@/types';
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from '@/lib/validations';
import { useMutation } from '@tanstack/react-query';
import FormContainer from '@/components/ui/formContainer';
import Alignment from '@/components/ui/alignment';
import { useNavigate } from 'react-router';
const SignupForm = () => {
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SignupFormFields>({
        resolver: zodResolver(signupSchema)
    });
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data: SignupFormFields) => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/signup`;
            const res = await fetch(path, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            }
        },
        onSuccess: () => {
            reset()
            navigate('/verify')
            setMessage('Success')
        },
        onError: (err) => {
            setMessage(err.message);
        }
    });
    const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
        signupMutation.mutate(data);
        sessionStorage.setItem("verifyEmail", data.email);
    };
    return (
        <FormContainer variant='dark'>
            <div className='text-white text-4xl font-bold'>
                Create Your Account
            </div>
            <form className='flex items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Username' {...register("username")} minLength={8} maxLength={15} />
                    <Message variant='error' content={errors.username?.message} />
                </Alignment>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Email' {...register("email")} />
                    <Message variant='error' content={errors.email?.message} />
                </Alignment>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Password' {...register("password")} minLength={8} maxLength={15} />
                    <Message variant='error' content={errors.password?.message} />
                </Alignment>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Confirm Password' {...register("confirmPassword")} minLength={8} maxLength={15} />
                    <Message variant='error' content={errors.confirmPassword?.message} />
                </Alignment>

                <Button type='submit' disabled={signupMutation.isPending}>
                    {signupMutation.isPending ? 'Loading...' : 'Submit'}
                </Button>
            </form >
            <Message
                variant={signupMutation.isError ? 'error' : signupMutation.isSuccess ? 'success' : 'default'}
                disableOnContent='md'
                content={message} />

        </FormContainer>

    )
}

export default SignupForm