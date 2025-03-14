'use server';

import db from '@/utils/db';
import {
  imageSchema,
  propertySchema,
  validateWithZodSchema,
} from '@/utils/schemas';
import { uploadImage } from '@/utils/supabade';
import { getAuthUser, renderError } from '@/utils/actions';
import { redirect } from 'next/navigation';

export const createPropertyAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};
