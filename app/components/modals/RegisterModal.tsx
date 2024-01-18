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

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  // const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
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
      const response = await axios.post('/api/register', data)
      registerModal.onClose();
    }
    catch(e) {
      console.log(e)
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
        disabled={isLoading} 
        formRegister={register}  
        errors={errors}
        required
      />
      <Input 
        id="name"
        label="Name"
        disabled={isLoading} 
        formRegister={register}  
        errors={errors}
        required
      /> 
      <Input 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading} 
        formRegister={register}  
        errors={errors}
        required
      />     
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
    />
  )
}

export default RegisterModal