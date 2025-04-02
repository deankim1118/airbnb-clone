import Image from 'next/image';

export default function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <section className='h-[300px] md:h-[500px] w-auto relative mt-8'>
      <Image
        src={mainImage}
        fill
        sizes='50vw'
        alt={name}
        className='object-cover  rounded-md'
        priority
      />
    </section>
  );
}
