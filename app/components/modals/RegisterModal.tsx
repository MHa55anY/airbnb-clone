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

// import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
// import Input from "../inputs/Input";
// import Heading from "../Heading";
import Button from "../Button";
import useRegisterModal from "../hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  // const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
      dirtyFields
    },reset
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post('/api/register', data)
      registerModal.onClose();
      reset()
      toast.success("You have sucessfully registered 😀!")
    }
    catch(e) {
      toast.error("Something went wrong!");
    }
    finally {
      setIsLoading(false)
    }
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to AirBnb" subtitle="Create an account!" />
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
        id="name"
        label="Name"
        disabled={isLoading} 
        formRegister={register}  
        errors={errors}
        required
        isDirty={dirtyFields['name']}
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
        onClick={()=>signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            Already have an account?
          </div>
          <div 
            className="text-neutral cursor-pointer hover:underline"
            onClick={registerModal.onClose}
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
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Register"
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal