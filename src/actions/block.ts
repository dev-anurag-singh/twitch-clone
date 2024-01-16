'use server';

import { getSelf } from '@/lib/services/auth-service';
import { blockUser, unblockUser } from '@/lib/services/block-service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (id: string) => {
  const self = await getSelf();

  const blockedUser = await blockUser(id);

  revalidatePath('/');
  if (blockedUser) {
    revalidatePath(`/u/${self.username}/community`);
  }
  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};
