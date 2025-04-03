'use server';

import { getAuthUser, renderError } from '@/utils/actions';
import { createReviewSchema, validateWithZodSchema } from '@/utils/schemas';
import db from '@/utils/db';
import { revalidatePath } from 'next/cache';

export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  const rawData = Object.fromEntries(formData);

  const validatedFields = validateWithZodSchema(createReviewSchema, rawData);
  await db.review.create({
    data: {
      ...validatedFields,
      profileId: user.id,
    },
  });
  revalidatePath(`/properties/${validatedFields.propertyId}`);
  return { ...prevState, message: 'Review submitted successfully' };
}

export const fetchPropertyReviewsByUser = async () => {
  return { message: 'fetch user reviews' };
};

export const deleteReviewAction = async () => {
  return { message: 'delete  reviews' };
};
