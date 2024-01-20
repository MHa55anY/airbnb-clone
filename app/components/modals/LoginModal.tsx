'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import Modal from "./Modal";
import Button from "../Button";
import useLoginModal from "../hooks/useLoginModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
      dirtyFields
    },reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success('Logged In!')
        router.refresh();
        loginModal.onClose()
      }

      if(callback?.error) toast.error(callback?.error);
    })
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input 
        id="email"
        label="Email"
        type="email"
        disabled={isLoading} 
        formRegister={register}
        errors={errors}
        required
        isDirty={dirtyFields['email']}
      />
      <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        formRegister={register}  
        errors={errors}
        required
        isDirty={dirtyFields['password']}
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={()=>null}
      />
      <Button 
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
        onClick={()=>null}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            Already have an account?
          </div>
          <div 
            className="text-neutral cursor-pointer hover:underline"
            onClick={loginModal.onClose}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Login"
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal