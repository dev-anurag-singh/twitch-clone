import Link from 'next/link';
import Logo from '../Logo';
import Search from './Search';
import Actions from './actions';

export const Navbar = () => {
  return (
    <nav className='p-4 lg:px-6 bg-muted flex justify-between items-center border-b gap-4'>
      <Link href='/'>
        <Logo />
      </Link>
      <Search />
      <Actions />
    </nav>
  );
};
