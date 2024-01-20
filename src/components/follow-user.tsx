'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import { onFollow, onUnFollow } from '@/actions/follow';
import { toast } from 'sonner';
import { onBlock } from '@/actions/block';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

function FollowUser({ isFollowing, userId }: ActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(data =>
          toast.success(`You're now following ${data.following.username}`)
        )
        .catch(() => toast.error('something went wrong'));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then(data =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error('something went wrong'));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(data =>
          toast.success(`Blocked the user ${data?.blocked.username}`)
        )
        .catch(() => toast.error('Something went wrong'));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant='default'>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlock} disabled={isPending} variant='destructive'>
        Block
      </Button>
    </>
  );
}

export default FollowUser;
