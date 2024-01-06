'use client';

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(state => state);
  const matches = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <aside
      className={cn(
        'flex flex-col bg-muted w-[70px] lg:w-60 h-full border-r',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
