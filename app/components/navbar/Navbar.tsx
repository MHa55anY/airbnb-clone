import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import Profile from './Profile';
import { User } from '@prisma/client';
import { FC } from 'react';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm border-b-[1px] '>
      <Container>
        <div className="py-4">
            <div className='
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
          '>
              <Logo/>
              <Search/>
              <Profile currentUser={currentUser} />
            </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar;