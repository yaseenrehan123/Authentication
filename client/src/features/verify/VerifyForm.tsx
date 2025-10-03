import FormContainer from '@/components/ui/formContainer'
import Button from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { VerifcationCode, VerificationFields } from '@/types'
import Message from '@/components/ui/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { verificationSchema } from '@/lib/validations'
import { useMutation } from '@tanstack/react-query'
import ResendCode from './ResendCode'
import { useNavigate } from 'react-router'

const VerifyForm = () => {
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const { register, reset, handleSubmit, formState: { errors } } = useForm<VerificationFields>({
        resolver: zodResolver(verificationSchema)
    });
    const { isPending, isError, isSuccess, mutate } = useMutation({
        mutationKey: ['verify'],
        mutationFn: (async (data: VerifcationCode) => {
            const obj = {
                email: sessionStorage.getItem("verifyEmail"),
                verificationCode: data
            };
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/verify`
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unkown error occured")
            };
        }),
        onSuccess: () => {
            reset()
            setMessage('Success')
            navigate('/')
        },
        onError: (err) => {
            setMessage(err.message);
        }
    });
    const length = 6
    const pinFields = ["pin1", "pin2", "pin3", "pin4", "pin5", "pin6"] as const;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const value = e.target.value.replace(/[^0-9]/g, "") // only digits
        e.target.value = value

        if (value && idx < length - 1) {
            // move to next input by DOM traversal
            (e.target.nextElementSibling as HTMLInputElement)?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && idx > 0) {
            (e.currentTarget.previousElementSibling as HTMLInputElement)?.focus();
        }
    }

    const onSubmit: SubmitHandler<VerificationFields> = async (data) => {
        const code: VerifcationCode = [data.pin1, data.pin2, data.pin3, data.pin4, data.pin5, data.pin6].map(String).join("");
        mutate(code);
    }

    const showErrorText = (): string | undefined => {
        for (const pin of pinFields) {
            const err = errors[pin]?.message;
            if (err) return err; // return first error found
        }
        return undefined; // no error
    };

    return (
        <FormContainer variant='dark'>
            <form className='flex items-center flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex items-center justify-center gap-1'>
                    {pinFields.map((field, i) => (
                        <input
                            key={i}
                            className='w-12 h-14 bg-white rounded-[4px] text-center text-black border-3 border-neutral-700 text-2xl'
                            type='text'
                            maxLength={1}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            {...register(field, {
                                valueAsNumber: true,
                                onChange: (e) => handleChange(e, i),
                            })}
                        />
                    ))}
                </div>
                <Button type='submit' disabled={isPending}>
                    {isPending ? 'Loading...' : 'Verify'}
                </Button>
                <Message variant='error'
                    content={showErrorText()} />
            </form>
            <Message
                variant={isError ? 'error' : isSuccess ? 'success' : 'default'}
                disableOnContent='md'
                content={message} />
            <ResendCode />
        </FormContainer>
    )
}

export default VerifyForm
