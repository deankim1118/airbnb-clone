import { redirect } from 'next/navigation';
import { fetchPropertyDetails } from '@/utils/actions';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import ShareButton from '@/components/properties/ShareButton';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyRating from '@/components/card/PropertyRating';
import BookingCalendar from '@/components/properties/booking/BookingCalendar';
import PropertyDetails from '@/components/properties/PropertyDetails';
import UserInfo from '@/components/properties/userInfo';
import { Separator } from '@/components/ui/separator';
import Description from '@/components/properties/booking/Description';
import Amenities from '@/components/properties/Amenities';
import SubmitReview from '@/components/reviews/SubmitReview';

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) return redirect('/');
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className=' text-4xl font-bold'>{property.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          <ShareButton propertyId={params.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <div className='grid grid-cols-12 gap-x-12 mt-12'>
        <div className='col-span-8'>
          <div className='flex gap-4 items-center'>
            <h1 className='text-xl font-bold'>{property.name}</h1>
            <PropertyRating inPage propertyId={params.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
        </div>
        <div className='col-span-4 flex flex-col items-center'>
          <BookingCalendar />
        </div>
      </div>
      <SubmitReview propertyId={property.id} />
    </section>
  );
}
