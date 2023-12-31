import Image from 'next/image';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full flex flex-col items-center gap-6 justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src='/logo.svg' width={50} height={50} alt='logo' />
        <span>Let&apos;s play</span>
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
