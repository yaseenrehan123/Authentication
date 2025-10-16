import FormField from '@/components/ui/formField';
import { useProfileFormStore } from '@/stores/useProfileFormStore';
import { useProfileStore } from '@/stores/useProfileStore';
import type { EditableProfileFieldProps } from '@/types';
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import Alignment from '@/components/ui/alignment';

const EditableProfleField = ({ setFieldKey, profileDataKey, label, inputProps }: EditableProfileFieldProps) => {
    const [selected, setSelected] = useState<boolean>(false);
    const profileDataValue = useProfileStore((state) => state[profileDataKey]);

    const setField = useProfileFormStore((state) => state[setFieldKey]);
    const startEditing = useProfileFormStore((state) => state.startEditing);
    const stopEditing = useProfileFormStore((state) => state.stopEditing);
    const editingFields = useProfileFormStore((state) => state.editingFields);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVal: string = event.target.value;
        if (setField) setField(newVal);
        //console.log(`SET VALUE:`, newVal);
    }

    const handleEditChange = () => {
        setSelected((prev) => !prev);
    }

    useEffect(() => {
        selected ? startEditing(profileDataKey) : stopEditing(profileDataKey);
    }, [selected])

    useEffect(() => {
        if (!editingFields.has(profileDataKey)) {
            setSelected(false);
            return
        }
        return
    }, [editingFields])

    //console.log("EDITING FIELDS:", editingFields);

    return (
        <div>
            <div className='flex items-center justify-center gap-6 text-2xl font-roboto'>
                {selected ?
                    <div>
                        <FormField {...inputProps}
                            type={inputProps?.type ?? 'text'}
                            variant={inputProps?.variant ?? 'default'}
                            onChange={handleOnChange} />
                    </div> :
                    <Alignment variant='rowCenter' gap='md'>
                        <div>{label}</div>
                        <div>{profileDataValue?.toString()}</div>
                    </Alignment>}
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