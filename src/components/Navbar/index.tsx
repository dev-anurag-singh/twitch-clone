import Link from 'next/link';
import Logo from '../Logo';
import Search from './Search';
import Actions from './actions';

export const Navbar = () => {
  return (
    <nav className='p-4 lg:px-6 bg-muted flex justify-between items-center shadow-sm'>
      <Link href='/' className='hidden md:inline-flex'>
        <Logo />
      </Link>
      <Search />
      <Actions />
    </nav>
  );
};
