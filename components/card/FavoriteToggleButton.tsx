import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Button';
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
