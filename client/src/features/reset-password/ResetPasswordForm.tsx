import Alignment from '@/components/ui/alignment'
import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Message from '@/components/ui/message'
import getCookie from '@/lib/getCookie'
import { resetPasswordFormSchema } from '@/lib/validations'
import type { ResetPasswordFields, ResetPasswordFormFields } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

const ResetPasswordForm = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<ResetPasswordFormFields>({
        resolver: zodResolver(resetPasswordFormSchema)
    });

    const { mutateAsync, isSuccess, isPending, isError, error } = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: async (data: ResetPasswordFields) => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/reset-password`;
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body?.error || "Unknown error occured");
            }
        }
    });

    const onSubmit = async (data: ResetPasswordFormFields) => {
        const obj: ResetPasswordFields = {
            email: getCookie('resetEmail'),
            password: data.password,
            confirmPassword: data.confirmPassword
        };

        await mutateAsync(obj);

        console.log("RESET PASSWORD DATA:", data);
    }

    return (
        <FormContainer variant='dark'>
            <form className='flex items-center flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                <Alignment variant='colCenter' gap='md'>
                    <FormField type='text' placeholder='New Password' {...register("password")} />
                    <Message content={errors.password?.message} variant='error' />
                </Alignment>
                <Alignment variant='colCenter' gap='md'>
                    <FormField type='text' placeholder='Confirm Password' {...register("confirmPassword")} />
                    <Message content={errors.confirmPassword?.message} variant='error' />
                </Alignment>
                <Button type='submit'>
                    Submit
                </Button>
                <Message variant={isSuccess ? 'success' : isPending ? 'loading' : isError ? 'error' : 'default'} disableOnContent='md'>
                    {isSuccess ? 'Sucesss' : isPending ? 'Loading' : isError ? error.message : ''}
                </Message>
            </form>
        </FormContainer>
    )
}

export default ResetPasswordForm