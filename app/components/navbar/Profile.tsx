'use client'
import Image from 'next/image';
import { FC, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface ProfileProps {
    currentUser?: SafeUser | null;
}

const UserProfile: FC<ProfileProps> = ({currentUser}) => {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const display = show ? '' : 'hidden';
    const closeDropdown = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShow(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
    
        return () => {
          document.removeEventListener('mousedown', closeDropdown);
        };
      }, []);

    return (
        <div className="relative inline-block">
        <Image  
            alt="Profile"
            className = "p-1 rounded-full hover:bg-gray-400 transition-colors duration-500 cursor-pointer border-2 shadow-sm"
            height="50"
            width="50"
            src="/images/profile.png"
            onClick={() => setShow(!show)}
        />
        {setShow && <Dropdown display={display} setShow={setShow} currentUser={currentUser}/>}
    </div>
    )
}

const Dropdown = ({display, setShow, currentUser}: {display: '' | 'hidden', onClick ?: MouseEventHandler<HTMLAnchorElement>, setShow: (value: SetStateAction<boolean>)=> void, currentUser?: SafeUser | null}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const closeDropdown = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShow(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
    
        return () => {
          document.removeEventListener('mousedown', closeDropdown);
        };
      }, []);
    return (
        <div className={`absolute ${display} mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-40 right-4`} ref={dropdownRef}>
            <div className="py-2">
                <>
                
                </>
                {!currentUser ? (
                    <>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={registerModal.onOpen}>Sign Up</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={loginModal.onOpen}>Login</a>
                    </>
                ) : (
                    <>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => null}>My trips</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => null}>My favorites</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => null}>My reservations</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => null}>My properties</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => null}>Airbnb your home</a>
                        <hr />
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={()=>signOut()}>Logout</a>
                    </>
                )} 

            </div>
        </div>
    )
}

const Profile: FC<ProfileProps> = ({currentUser}) => {
    const [showModal,setShowModal] = useState(false);
    return (
        <>
            <div className="flex flex-row gap-1 py-3 items-center">
                <div className='p-3 rounded-full hover:bg-gray-300 transition cursor-pointer'>
                    Airbnb your home
                </div>
                <Image  
                    alt="Logo"
                    className = "p-1 rounded-full hover:bg-gray-300 transition cursor-pointer"
                    height="30"
                    width="30"
                    src="/images/globe.png"
                />
                <UserProfile currentUser={currentUser} />
                {/* <SignUpModal setShowModal={ setShowModal } showModal={showModal} /> */}
            </div>
        </>

    )
}

export default Profile;