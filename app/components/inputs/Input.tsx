'use client'

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormGetFieldState, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    formRegister: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    isDirty?:boolean
}

const Input: FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    formRegister,
    required,
    errors,
    isDirty
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}  
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
       <input
        id={id}
        disabled={disabled}
        {...formRegister(id, { required })}
        placeholder=" "
        type={type}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70
                    disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}`}
      />
      <label
          className={`absolute text-md duration-150 transform ${isDirty ? '-translate-y-4' : '-translate-y-3'} -translate-y-3 top-5 z-10 origin-top-left ${formatPrice ? 'left-9' : 'left-4'}
                      peer-placeholder-shown: ${isDirty ? 'scale-75' : 'scale-100'} ${!isDirty && 'peer-placeholder-shown:translate-y-0'} peer-focus:scale-75 peer-focus:-translate-y-4 
                      ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                    `}
      >
          {label}
      </label>        

    </div>
  )
}

export default Input