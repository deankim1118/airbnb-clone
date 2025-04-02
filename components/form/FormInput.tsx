import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function FormInput(props: FormInputProps) {
  const { name, type, label, defaultValue, placeholder } = props;

  return (
    <div>
      <Label className='capitalize' htmlFor={name}>
        {label || name}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
