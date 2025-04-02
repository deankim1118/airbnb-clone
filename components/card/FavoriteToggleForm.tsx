'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { FavoriteSubmitButton } from '../form/Button';
import { toggleFavoriteAction } from './action';

type FavoriteToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  propertyId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <FavoriteSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
