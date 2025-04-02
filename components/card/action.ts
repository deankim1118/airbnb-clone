'use server';
import db from '@/utils/db';
import { getAuthUser, renderError } from '../../utils/actions';
import { revalidatePath } from 'next/cache';

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const { propertyId, favoriteId, pathname } = prevState;
  const user = await getAuthUser();

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Faves' : 'Added to Faves' };
  } catch (err) {
    return renderError(err);
  }
};
