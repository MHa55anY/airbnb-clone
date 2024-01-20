'use client'
import Image from 'next/image';
import { MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';

const UserProfile = ({ onClick } : {onClick : () => void}) => {
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
        {setShow && <Dropdown display={display} setShow={setShow} />}
    </div>
    )
}

const Dropdown = ({display, setShow}: {display: '' | 'hidden', onClick ?: MouseEventHandler<HTMLAnchorElement>, setShow: (value: SetStateAction<boolean>)=> void}) => {
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
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={registerModal.onOpen}>Sign Up</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={loginModal.onOpen}>Login</a>
            </div>
        </div>
    )
}

const Profile = () => {
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
                <UserProfile onClick={() => setShowModal(true)} />
                {/* <SignUpModal setShowModal={ setShowModal } showModal={showModal} /> */}
            </div>
        </>

    )
}

export default Profile;