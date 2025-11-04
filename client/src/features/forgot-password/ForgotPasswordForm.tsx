import Alignment from '@/components/ui/alignment'
import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Message from '@/components/ui/message'
import { forgotPasswordSchema } from '@/lib/validations'
import type { ForgotPasswordFields } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

const ForgotPasswordForm = () => {
    const [message, setMessage] = useState<string>('');

    const { handleSubmit, register, reset, formState: { errors } } = useForm<ForgotPasswordFields>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const { mutateAsync, isError, isSuccess } = useMutation({
        mutationKey: ['forgotPassword'],
        mutationFn: async (data: ForgotPasswordFields) => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/forgot-password`;
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured")
            }
        },
        onSuccess: () => {
            reset();
            setMessage('Success')
        },
        onError: (err) => {
            setMessage(err.message)
        }
    });

    const onSubmit: SubmitHandler<ForgotPasswordFields> = async (data: ForgotPasswordFields) => {
        console.log("FORGOT PASSWORD FORM SUBMITTED")
        mutateAsync(data);
    }


    return (
        <FormContainer variant='dark'>
            <form className='flex items-center flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                <Alignment variant='colLeft' gap='md'>
                    <FormField
                        placeholder='email'
                        {...register("email")}
                    />
                    <Message content={errors.email?.message} variant='error' />
                </Alignment>
                <Button type='submit' >Submit</Button>
                <Message
                    variant={isError ? 'error' : isSuccess ? 'success' : 'default'}
                    disableOnContent='md'
                    content={message} />
            </form>

        </FormContainer>
    )
}

export default ForgotPasswordForm