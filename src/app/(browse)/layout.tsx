import { Navbar } from '@/components/Navbar';
import Sidebar, { SidebarSkeleton } from '@/components/Sidebar';
import { Suspense } from 'react';

function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='grid h-full grid-rows-[auto_1fr]'>
        <Navbar />
        <div className='flex'>
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
          <div className='grow'>{children}</div>
        </div>
      </div>
    </>
  );
}

export default BrowseLayout;
