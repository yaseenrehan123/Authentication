import useDeleteAccountConfirmationStore from '@/stores/useDeleteAccountConfirmationStore'
import React, { useEffect, useState } from 'react'
import DeleteConfirmationCancelIcon from './DeleteConfirmationCancelIcon';
import FormField from '@/components/ui/formField';
import { useProfileStore } from '@/stores/useProfileStore';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import type { DeleteAccountConfirmationFields } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteAccountConfirmationSchema } from '@/lib/validations';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import useRefreshAccessToken from '@/hooks/useRefreshAccessToken';
import isTokenExpired from '@/lib/isTokenExpired';

const DeleteAccountConfirmation = () => {
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const setEnabled = useDeleteAccountConfirmationStore((state) => state.setEnabled);
    const username = useProfileStore((state) => state.username);
    const accessToken = useAuthStore((state) => state.accessToken);
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
    const { handleSubmit, register, reset, watch } = useForm<DeleteAccountConfirmationFields>({
        resolver: zodResolver(deleteAccountConfirmationSchema)
    });

    const confirmationValue: string = watch("username");

    const { mutateAsync } = useRefreshAccessToken();

    const { mutate } = useMutation({
        mutationKey: ["deleteAccount"],
        mutationFn: async () => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/delete-account`;
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const body = await res.json();
            if (!res.ok) {
                throw new Error(body?.error || "Unknown error occured!");
            }
        },
        onSuccess: () => {
            setMessage("Success");
            reset();
            setEnabled(false);
            setAccessToken("");
            setRefreshToken("");
            setLoggedIn(false);

        },
        onError: (e: Error) => {
            setMessage(e.message)
        }
    });

    const onSubmit = async () => {
        if (!refreshToken) return;
        if (!accessToken || isTokenExpired(accessToken)) {
            await mutateAsync();
        };
        mutate();
    }

    useEffect(() => {
        if (!username) {
            setConfirmed(false);
            return;
        }

        setConfirmed(confirmationValue === username);
    }, [confirmationValue]);

    return (
        <div className='fixed w-[clamp(20rem,80vw,40rem)] h-[clamp(10rem,50vh,30rem)] bg-black rounded-[8px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
        outline-2 outline-gray-500 flex flex-col items-center gap-4 font-roboto p-4 z-30'>
            <div className='text-white text-[clamp(1.5rem,8vw,3rem)] font-bold'>
                Are you sure you?
            </div>

            <form className='flex items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    placeholder='Confirm Username'
                    {...register("username")}
                />

                {confirmed && <div className='text-yellow-500 text-center'>
                    This action cannot be undone! Your account would be permanantely deleted! Proceed with caution!
                </div>}

                {confirmed &&
                    <Button className='text-red-500 w-32 font-bold font-roboto'
                        type='submit'>
                        Delete Account
                    </Button>}
            </form>
            <DeleteConfirmationCancelIcon />
        </div>
    )
}

export default DeleteAccountConfirmation