import Message from '@/components/ui/message';
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const ResendCode = () => {
    const [message, setMessage] = useState<String | null>(null);

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationKey: ['resendCode'],
        mutationFn: async () => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/resend-code`;
            const email = sessionStorage.getItem('verifyEmail') || '';
            const res = await fetch(path, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            }
        },
        onSuccess: () => setMessage('Success'),
        onError: (err) => setMessage(err.message)
    })
    const onClick = async () => {
        if (isPending)
            return;
        mutate();
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [message])

    return (
        <div className='flex items-center flex-col gap-2' onClick={onClick}>
            <div className='text-purple-500 hover:text-purple-700 hover:cursor-pointer transition-all duration-150 active:scale-98'>
                Receive new code
            </div>
            <Message variant={isError ? 'error' : isSuccess ? 'success' : 'default'}>
                {message}
            </Message>
        </div>
    )
}

export default ResendCode