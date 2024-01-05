'use client';

import { useIsClient } from 'usehooks-ts';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

import { ToggleSkeleton } from './toggle';
import { RecommendedSkeleton } from './recommended';
import { FollowingSkeleton } from './following';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed, onCollapse, onExpand } = useSidebar(state => state);
  const matches = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  if (!isClient) {
    return (
      <aside className='flex flex-col shrink-0 w-[70px] lg:w-60 h-full bg-muted border-r'>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        'flex flex-col w-60 h-full shrink-0 bg-muted border-r',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
