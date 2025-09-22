import { useFormContext } from "react-hook-form";
import FormField from "@/components/ui/formField";
import Message from "@/components/ui/message";

interface FormItemProps {
    name: string;
    placeholder?: string;
    type?: string;
    minLength?: number;
    maxLength?: number;
}

const FormItem: React.FC<FormItemProps> = ({
    name,
    placeholder,
    type = "text",
    minLength,
    maxLength,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className="flex flex-col gap-1">
            <FormField
                type={type}
                placeholder={placeholder}
                {...register(name, { minLength, maxLength })}
            />
            <Message variant="error">{errors[name]?.message as string}</Message>
        </div>
    );
};

export default FormItem;
