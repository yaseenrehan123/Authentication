import Alignment from '@/components/ui/alignment'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Message from '@/components/ui/message'
import Button from '@/components/ui/button'
import { loginSchema } from '@/lib/validations'
import type { LoginFormFields } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginFormFields>({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: LoginFormFields) => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/login`;
            const res = await fetch(path, {
                method: "POST",
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
        onSuccess: () => reset()
    });

    const onSubmit = async (data: LoginFormFields) => {
        loginMutation.mutate(data);
    };

    return (
        <FormContainer variant='dark'>
            <div className='text-white text-4xl font-bold'>
                Login
            </div>

            <form className='flex items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Email' {...register('email')} />
                    <Message variant='error'>{errors.email?.message}</Message>
                </Alignment>
                <Alignment variant='colLeft'>
                    <FormField variant='large' placeholder='Password' minLength={8} maxLength={15} {...register('password')} />
                    <Message variant='error'>{errors.password?.message}</Message>
                </Alignment>
                <Button type='submit' disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? 'Loading...' : 'Submit'}
                </Button>
                <Message variant={loginMutation.isError ? 'error' : loginMutation.isSuccess ? 'success' : 'default'}>
                    {loginMutation.isError ? `${loginMutation.error}` : loginMutation.isSuccess ? 'Success' : ''}
                </Message>
            </form>
        </FormContainer>
    )
}

export default LoginForm