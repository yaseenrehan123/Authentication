import React, { useEffect, useState } from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { VerifyPasswordResetTokenFields } from '@/types';
import getCookie from '@/lib/getCookie';
import Message from '@/components/ui/message';
const ResetPasswordPage = () => {
    const [params, setParams] = useSearchParams();
    const [token, setToken] = useState<string>('');
    useEffect(() => {
        const tokenValue: string = params.get('token') ?? '';
        setToken(tokenValue)
        console.log("RESET PASSWORD TOKEN:", tokenValue);
        console.log("RESET EMAIL COOKIE:", localStorage.getItem("resetEmail"));
    }, []);

    useEffect(() => {
        if (!token) return;
        const data: VerifyPasswordResetTokenFields = {
            token: token,
            email: localStorage.getItem("resetEmail") ?? ""
        };
        mutateAsync(data);
    }, [token]);

    const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
        mutationKey: ['verifyPasswordReset'],
        mutationFn: async (data: VerifyPasswordResetTokenFields) => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/verify-password-reset`;

            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body?.error || "Unknown error occured")
            }
        }
    });


    return (
        <div className='pt-13 flex items-center flex-col'>
            {isPending && <Message content={'Verifying reset link...'} variant='loading' />}
            {isError && <Message content={(error as Error).message} variant='error' />}
            {isSuccess && <ResetPasswordForm />}
        </div >
    )
}

export default ResetPasswordPage