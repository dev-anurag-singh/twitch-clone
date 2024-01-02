import { Navbar } from '@/components/Navbar';

function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='grid h-full grid-rows-[auto_1fr]'>
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default BrowseLayout;
