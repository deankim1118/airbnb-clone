'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const DynamicMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  },
);

export default function MapClientWrapper({
  countryCode,
}: {
  countryCode: string;
}) {
  // 클라이언트에서만 렌더링. SSR 시에는 이 컴포넌트를 통째로 비워둠.
  return <DynamicMap countryCode={countryCode} />;
}
