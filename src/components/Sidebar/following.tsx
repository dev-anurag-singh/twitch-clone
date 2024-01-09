'use client';

import { useSidebar } from '@/store/useSidebar';
import { Follow, Stream, User } from '@prisma/client';
import UserItem, { UserItemSkeleton } from './user-item';

interface FollowingProps {
  data: (Follow & { following: User & { stream: Stream | null } })[];
}
export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar(state => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>Following</p>
        </div>
      )}
      <ul>
        {data.map(follow => (
          <UserItem
            key={follow.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className='px-2 pt-2 lg:pt-0'>
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
