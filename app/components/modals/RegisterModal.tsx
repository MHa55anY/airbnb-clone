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
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Register"
    />
  )
}

export default RegisterModal