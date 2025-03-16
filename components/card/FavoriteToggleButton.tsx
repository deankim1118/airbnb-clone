import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton, CardSubmitButton } from '../form/Button';
import FormContainer from '../form/FormContainer';
import FavoriteToggleForm from './FavoriteToggleForm';
import { fetchFavoriteId } from '@/utils/actions';

export default async function FavoriteToggleButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const { userId } = auth();
  if (!userId) {
    return <CardSignInButton />;
  }

  const favoriteId = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm propertyId={propertyId} favoriteId={favoriteId} />;
}
