"use client";
import React, { useState } from "react";
import SignUpComponent from "./sign-up.component";
import { RegisterMutation } from "../api";
import { useRouter } from "next/navigation";
import { routerPaths } from "src/core/lib/router";
import { toast } from "react-toastify";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const SignUpContainer: React.FunctionComponent<Props> = () => {
  const mutation = RegisterMutation();
  const router = useRouter();

  const onRegister = (email: string, username: string, password: string) => {
    mutation.mutate({
      username,
      password,
      email,
      onSuccess: onRegisterSuccess,
    });
  };

  const onRegisterSuccess = () => {
    // onSuccess
    toast.success("Register new account success!");
    router.push(routerPaths.signin);
  };
  return <SignUpComponent onRegister={onRegister} />;
};

export default SignUpContainer;
