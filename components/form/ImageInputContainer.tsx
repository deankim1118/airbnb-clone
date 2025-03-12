'use client';

import { actionFunction } from '@/utils/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import { LuUser } from 'react-icons/lu';
import { useState } from 'react';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import SubmitButton from './SubmitButton';

interface ImageContainerProps {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
}

export default function ImageInputContainer(props: ImageContainerProps) {
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const { image, name, action, text, children } = props;
  const userIcon = (
    <LuUser className=' bg-primary rounded-sm text-white size-24 p-2' />
  );

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className='rounded-md object-cover mb-4 w-24 h-24'
        />
      ) : (
        userIcon
      )}

      <Button
        variant='outline'
        size='sm'
        className='mt-2'
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <FormContainer action={action}>
          {children}
          <ImageInput />
          <SubmitButton size='sm' text='change image' />
        </FormContainer>
      )}
    </div>
  );
}
