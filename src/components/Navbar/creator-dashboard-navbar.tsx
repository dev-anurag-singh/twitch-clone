import Link from 'next/link';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export const CreatorDashboardNavbar = () => {
  return (
    <nav className='p-4 lg:px-6 bg-muted flex justify-between items-center border-b gap-2'>
      <Link href='/'>
        <Logo />
      </Link>
      <div className='flex items-center gap-3 md:gap-4'>
        <Button
          size='sm'
          variant={'ghost'}
          className='text-muted-foreground hover:text-primary'
          asChild
        >
          <Link href='/'>
            <LogOut className='h-5 w-5 mr-2' /> Exit
          </Link>
        </Button>
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  );
};
