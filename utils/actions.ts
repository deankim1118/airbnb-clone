'use server';

import db from './db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  if (!user.privateMetadata.hasProfile) {
    redirect('/profile/create');
  }
  return user;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect('/profile/create');
  return profile;
};

export const renderError = async (err: unknown) => {
  console.error(err);
  return {
    message: err instanceof Error ? err.message : 'An error occurred',
  };
};

export const fetchProperties = async ({
  category,
  search = '',
}: {
  category?: string;
  search?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      image: true,
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          image: true,
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = async (id: string) => {
  const property = await db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  return property;
};
