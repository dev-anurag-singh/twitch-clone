'use server';

import { followUser, unfollowUser } from '@/lib/services/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error('Interal Error');
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath('/');

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error('Internal Error');
  }
};
