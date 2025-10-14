import FormField from '@/components/ui/formField';
import { useProfileFormStore } from '@/stores/useProfileFormStore';
import { useProfileStore } from '@/stores/useProfileStore';
import type { EditableProfileFieldProps } from '@/types';
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from 'react'

const EditableProfleField = ({ fieldKey, label }: EditableProfileFieldProps) => {
    const [selected, setSelected] = useState<boolean>(false);
    const value = useProfileStore((state) => (state as Record<"username", string>)[fieldKey]);

    const setField = useProfileFormStore((state) => fieldKey === 'username' ? state.setUsername : null);
    const startEditing = useProfileFormStore((state) => state.startEditing);
    const stopEditing = useProfileFormStore((state) => state.stopEditing);
    const editingFields = useProfileFormStore((state) => state.editingFields);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal: string = event.target.value;
        if (setField) setField(newVal);
        console.log(`SET VALUE:`, newVal);
    }

    const handleEditChange = () => {
        setSelected((prev) => !prev);
    }

    useEffect(() => {
        selected ? startEditing(fieldKey) : stopEditing(fieldKey);
    }, [selected])

    useEffect(() => {
        if (!editingFields.has(fieldKey)) {
            setSelected(false);
            return
        }
        return
    }, [editingFields])

    console.log("EDITING FIELDS:", editingFields);

    return (
        <div>
            <div className='flex items-center justify-center gap-6 text-2xl font-roboto'>
                {!selected && <div className='flex items-center justify-center gap-2'>
                    <div>{label}</div>
                    <div>{value}</div>
                </div>}
                {selected && <div>
                    <FormField variant='default' bg='dark' type='text' minLength={8} maxLength={15}
                        onChange={handleOnChange} />
                </div>}
                <div className={`flex items-center justify-center hover:cursor-pointer text-3xl hover:scale-96
                transition-all duration-150
                ${selected ? 'hover:text-white text-[#19376D]' : 'hover:text-[#19376D] text-white'}`}
                    onClick={handleEditChange}>
                    <MdEdit />
                </div>

            </div>
        </div>
    )
}

export default EditableProfleField