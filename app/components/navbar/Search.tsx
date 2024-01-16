'use client';
import Image from 'next/image';

const Search = () => {
  return (
    <div 
        className="
            border-[1px]
            w-full
            md:w-auto
            py-3
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
        "
        >
        <div 
            className="
                flex
                flex-row
                items-center
                justify-between
            "
        >
            <div 
                className="
                    text-sm
                    font-semibold
                    px-6
                    border-r-2
                "
            >
                Anywhere
            </div>
            <div className="
                    text-sm
                    font-semibold
                    px-6
                    border-r-2
            "
            >  
                Anyweek
            </div>
            <div className="flex items-center px-6 gap-2">
                <div className="text-sm font-semibold">
                    Add Guests
                </div>
                <div className="w-8 h-8 bg-rose-red rounded-full flex items-center justify-center">
                    <Image
                        alt="Logo"
                        className="hidden md:block cursor-pointer"
                        src="/searchIcon.svg"
                        width={15}
                        height={15}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search