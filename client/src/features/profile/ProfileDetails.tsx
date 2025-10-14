import Button from '@/components/ui/button';
import FormField from '@/components/ui/formField';
import { useProfileFormStore } from '@/stores/useProfileFormStore';
import { useProfileStore } from '@/stores/useProfileStore';
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import EditableProfleField from './EditableProfleField';
import { format } from 'date-fns';
const ProfileDetails = () => {
    const id = useProfileStore((state) => state.id);
    const email = useProfileStore((state) => state.email);
    const createdAt = useProfileStore((state) => state.createdAt);
    const updatedAt = useProfileStore((state) => state.updatedAt);

    const editingFields = useProfileFormStore((state) => state.editingFields);
    const clearEditing = useProfileFormStore((state) => state.clearEditing);
    const confirmEditing = useProfileFormStore((state) => state.confirmEditing);
    /*
    const [selected, setSelected] = useState<boolean>(false);
    const username = useProfileStore((state) => state.username);
    const setUsername = useProfileFormStore((state) => state.setUsername);
    */
    /*
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal: string = event.target.value;
        setUsername(newVal);
        console.log("SET USERNAME:", newVal);
    }
    */
    return (
        <div className='flex items-baseline flex-col gap-4 text-white w-screen pl-5'>
            <EditableProfleField label='Username:' fieldKey='username' minLength={8} maxLength={15} bg='dark' />
            <div className='flex items-center justify-center gap-2 font-roboto'>
                <p>Id:</p>
                <p>{id}</p>
            </div>
            <div className='flex items-center justify-center gap-2 font-roboto'>
                <p>Email:</p>
                <p>{email}</p>
            </div>
            <div className='flex items-center justify-center gap-2 font-roboto'>
                <p>Created At:</p>
                <p>{createdAt ? format(new Date(createdAt), 'PP') : "N/A"}</p>
            </div>
            <div className='flex items-center justify-center gap-2 font-roboto'>
                <p>Updated At:</p>
                <p>{updatedAt ? format(new Date(updatedAt), 'PP') : "N/A"}</p>
            </div>
            {/* <div className='flex items-center justify-center gap-6 text-2xl font-roboto'>
                {!selected && <div className='flex items-center justify-center gap-2'>
                    <div>Username:</div>
                    <div>{username}</div>
                </div>}
                {selected && <div>
                    <FormField variant='default' bg='dark' type='text' minLength={8} maxLength={15}
                        onChange={handleOnChange} />
                </div>}
                <div className={`flex items-center justify-center hover:cursor-pointer text-3xl hover:scale-96
                transition-all duration-150
                ${selected ? 'hover:text-white text-[#19376D]' : 'hover:text-[#19376D] text-white'}`}
                    onClick={() => setSelected(prev => !prev)}>
                    <MdEdit />
                </div>

            </div> */}

            {editingFields.size > 0 && <div className='flex items-center justify-center gap-4'>
                <Button onClick={() => clearEditing()}>Cancel</Button>
                <Button className='bg-blue-600 text-white' onClick={() => confirmEditing()}>Confirm</Button>
            </div>}

        </div>
    )
}

export default ProfileDetails