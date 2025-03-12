import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';
import FormContainer from '@/components/form/FormContainer';

const createProfileAction = async (prevState: any, formdata: FormData) => {
  'use server';
  const firstName = formdata.get('firstName') as string;
  return { message: `Profile created for ${firstName}` };
};

export default function CreateProfilePage() {
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
        </FormContainer>
      </div>
    </section>
  );
}
