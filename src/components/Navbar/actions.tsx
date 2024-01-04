import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className='flex items-center justify-end'>
      {!user && (
        <SignInButton>
          <Button size='sm' variant='default'>
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className='flex items-center gap-3 md:gap-4'>
          <Button
            size='sm'
            variant='ghost'
            className='text-muted-foreground hover:text-primary px-0'
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className='h-5 w-5 lg:mr-2' />
              <span className='hidden lg:block'>Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl='/' />
        </div>
      )}
    </div>
  );
};

export default Actions;
