'use server';

import db from '@/utils/db';
import {
  imageSchema,
  profileSchema,
  validateWithZodSchema,
} from '@/utils/schemas';
import { uploadImage } from '@/utils/supabade';
import { getAuthUser, renderError } from '@/utils/actions';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const createProfileAction = async (
  prevState: any,
  formdata: FormData,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return notFound();
    }
    const rawData = Object.fromEntries(formdata);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (err) {
    return renderError(err);
  }
  redirect('/');
};

export const updateProfileAction = async (
  prevState: any,
  formdata: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formdata);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath('/profile');
    return { message: `updated profile successfully` };
  } catch (err) {
    return renderError(err);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
