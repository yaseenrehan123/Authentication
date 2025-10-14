import Button from '@/components/ui/button';
import FormField from '@/components/ui/formField';
import { useProfileFormStore } from '@/stores/useProfileFormStore';
import { useProfileStore } from '@/stores/useProfileStore';
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditableProfleField from './EditableProfleField';
import { format } from 'date-fns';
import Alignment from '@/components/ui/alignment';
const ProfileDetails = () => {
    const id = useProfileStore((state) => state.id);
    const email = useProfileStore((state) => state.email);
    const createdAt = useProfileStore((state) => state.createdAt);
    const updatedAt = useProfileStore((state) => state.updatedAt);

    const editingFields = useProfileFormStore((state) => state.editingFields);
    const clearEditing = useProfileFormStore((state) => state.clearEditing);
    const confirmEditing = useProfileFormStore((state) => state.confirmEditing);

    return (
        <div className='flex items-baseline flex-col gap-4 text-white w-screen pl-5 font-roboto'>
            <EditableProfleField label='Username:' fieldKey='username' minLength={8} maxLength={15} bg='dark' />
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
                <Button className='bg-blue-600 text-white' onClick={() => confirmEditing()}>Confirm</Button>
            </Alignment>}

        </div>
    )
}

export default ProfileDetails