import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 4,
  className,
}: TextFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className='text-sm font-medium'>{label}</label>}

      {multiline ? (
        <Textarea
          placeholder={placeholder}
          rows={rows}
          value={value}
          className='break-all'
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default TextField;
