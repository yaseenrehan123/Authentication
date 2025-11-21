import useDeleteAccountConfirmationStore from '@/stores/useDeleteAccountConfirmationStore';
import React from 'react'
import { ImCross } from "react-icons/im";

const DeleteConfirmationCancelIcon = () => {
    const setEnabled = useDeleteAccountConfirmationStore((state) => state.setEnabled);

    const onClick = () => {
        setEnabled(false);
    }
    return (
        <div className='flex items-center justify-center text-4xl text-red-500 absolute top-[-8px] right-[-8px]
        hover:cursor-pointer hover:text-red-700 transition-all duration-150'
            onClick={onClick}>
            <ImCross />
        </div>
    )
}

export default DeleteConfirmationCancelIcon