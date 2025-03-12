'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  className: string;
  text: string;
}

export default function SubmitButton({ className = '', text = 'Submit' }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      size='lg'
      className={`capitalize ${className}`}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
