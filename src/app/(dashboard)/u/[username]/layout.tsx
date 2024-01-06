import { CreatorDashboardSidebar } from '@/components/CreatorSidebar';
import { CreatorDashboardNavbar } from '@/components/Navbar/creator-dashboard-navbar';
import { getSelfByUsername } from '@/lib/services/auth-service';
import { redirect } from 'next/navigation';

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}
async function CreatorDashboardLayout({
  params,
  children,
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect('/');
  }

  return (
    <div className='grid h-full grid-rows-[auto_1fr]'>
      <CreatorDashboardNavbar />
      <div className='grid grid-cols-[auto_1fr]'>
        <CreatorDashboardSidebar />
        {children}
      </div>
    </div>
  );
}

export default CreatorDashboardLayout;
