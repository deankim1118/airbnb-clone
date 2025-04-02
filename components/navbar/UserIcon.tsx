import { LuUser } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';
import Image from 'next/image';

export default async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return (
      // <img
      //   className='rounded-full size-6 object-cover'
      //   src={profileImage}
      //   alt='User Avatar'
      // />
      <Image
        src={profileImage}
        alt='User Avatar'
        width={40}
        height={40}
        className='rounded-full size-6 object-cover'
      />
    );
  }
  return <LuUser className=' bg-primary rounded-full text-white' />;
}
