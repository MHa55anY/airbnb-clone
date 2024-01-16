import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm} from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
const SignUpModal = ({ setShowModal, showModal } : {setShowModal: Dispatch<SetStateAction<boolean>>, showModal: boolean}) => {
  const methods = useForm<{email: string, password: string}>();
  const { register, handleSubmit, formState: { errors } } = methods;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/70 z-50 ">
          <div className="bg-white relative md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto rounded-md">
            <div className={`translate duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <header className="p-4 text-center">
              <Image  
                alt="cross"
                className = "cursor-pointer shadow-sm inline absolute left-3 top-5"
                height={15}
                width={15}
                src="/cross.svg"
                onClick={() => setShowModal(false)}
              />
              <h3 className="text-sm font-bold text-black inline-block p-0">Login Or Sign Up</h3>
            </header>
            <div className="h-0.5 bg-gray-300"/>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((f) => console.log(f))} className='p-4'>
                <h3 className="text-xl font-bold text-black inline-block p-0 mb-4">Welcome to AirBnb</h3>
                <div className="mb-4 relative">
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    id="email"
                    className={`peer w-full border-2 font-light rounded-md py-2 px-3 focus:outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                                ${errors['email'] ? 'border-rose-500' : 'border-neutral-300'} ${errors['email'] ? 'focus:border-rose-500' : 'focus:border-neutral-300'}
                              `}
                    placeholder=" "
                  />
                  {errors.email && <p className='text-red-600 text-sm mt-1'>* Email is required.</p>}
                  <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100`}>Email:</label>
                </div>
                <div className="mb-4">
                  {/* <label className="block text-sm font-semibold mb-1">Password:</label> */}
                  <input
                    {...register('password', { required: true })}
                    type="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:placeholder-transparent"
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className='text-red-600 text-sm mt-1'>* Password is required.</p>}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-rose-red text-white px-4 py-2 rounded-full hover:bg-red-400 transition"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUpModal;
  