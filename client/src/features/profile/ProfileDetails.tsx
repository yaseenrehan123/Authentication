import Button from '@/components/ui/button';
import FormField from '@/components/ui/formField';
import { useEditProfileFormStore } from '@/stores/useEditProfileFormStore';
import { useProfileStore } from '@/stores/useProfileStore';
import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditableProfleField from './EditableProfleField';
import { format } from 'date-fns';
import Alignment from '@/components/ui/alignment';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import isTokenExpired from '@/lib/isTokenExpired';
import useRefreshAccessToken from '@/hooks/useRefreshAccessToken';
import { FormProvider, useForm } from 'react-hook-form';
import type { EditProfileFormFields } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '@/lib/validations';
import Message from '@/components/ui/message';
const ProfileDetails = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    const id = useProfileStore((state) => state.id);
    const email = useProfileStore((state) => state.email);
    const createdAt = useProfileStore((state) => state.createdAt);
    const updatedAt = useProfileStore((state) => state.updatedAt);

    const editingFields = useEditProfileFormStore((state) => state.editingFields);
    const clearEditing = useEditProfileFormStore((state) => state.clearEditing);
    const confirmEditing = useEditProfileFormStore((state) => state.confirmEditing);

    const formMethods = useForm<EditProfileFormFields>({
        resolver: zodResolver(editProfileSchema)
    });

    const { handleSubmit, reset, formState: { errors } } = formMethods;

    const { mutateAsync } = useRefreshAccessToken();
    const { mutate } = useMutation({
        mutationKey: ['editProfile'],
        mutationFn: async (data: any) => {
            console.log("EDIT PROFILE MUTATION FN CALLED!");
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/edit-profile`;
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            }
        }
    });

    const onSubmit = async () => {
        //console.log("PROFILE DETAILS HANDLE SUBMIT RAN!")
        const data = confirmEditing();
        const ensureToken = async () => {
            if (!document.cookie.includes("hasRefreshToken")) return;
            if (!accessToken || isTokenExpired(accessToken)) {
                await mutateAsync();
            };
            //SetReady(true)
        }
        await ensureToken();
        console.log("EDITIED DATA IN PROFILE DETAILS:", data);
        mutate(data);
        reset();
    }

    return (
        <FormProvider {...formMethods}>
            <div className='flex items-baseline flex-col gap-4 text-white w-screen pl-5 font-roboto'>
                <Alignment variant='colCenter'>
                    <EditableProfleField
                        inputProps={{
                            bg: 'dark',
                            type: 'text',
                            minLength: 8,
                            maxLength: 15,
                            variant: 'default'
                        }}
                        label='Username:'
                        profileDataKey="username"
                        setFieldKey="setUsername" />
                    <Message content={errors.username?.message} variant='error' />
                </Alignment>

                <Alignment variant='rowCenter'>
                    <p>Id:</p>
                    <p>{id}</p>
                </Alignment>
                <Alignment variant='rowCenter'>
                    <p>Email:</p>
                    <p>{email}</p>
                </Alignment>
                <Alignment variant='rowCenter'>
                    <p>Created At:</p>
                    <p>{createdAt ? format(new Date(createdAt), 'PP') : "N/A"}</p>
                </Alignment>
                <Alignment variant='rowCenter'>
                    <p>Updated At:</p>
                    <p>{updatedAt ? format(new Date(updatedAt), 'PP') : "N/A"}</p>
                </Alignment>
                {editingFields.size > 0 && <Alignment variant='rowCenter' gap='lg'>
                    <Button onClick={() => clearEditing()}>Cancel</Button>
                    <Button className='bg-blue-600 text-white' onClick={handleSubmit(() => onSubmit())}>Confirm</Button>
                </Alignment>}

            </div>
        </FormProvider>
    )
}

export default ProfileDetails