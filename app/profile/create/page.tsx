import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '../action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function CreateProfilePage() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect('/');
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>New User</h1>
      <div className='border p-8 rounded-md max-w-lg'>
        <FormContainer action={createProfileAction}>
          <div className='grid gap-4 mt-4 '>
            <FormInput type='text' name='firstName' label='First Name' />
            <FormInput type='text' name='lastName' label='Last Name' />
            <FormInput type='text' name='username' label='Username' />
          </div>
          <SubmitButton text='Create Profile' />
        </FormContainer>
      </div>
    </section>
  );
}
