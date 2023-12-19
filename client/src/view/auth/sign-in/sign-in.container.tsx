"use client";

import React, { useCallback, useEffect } from "react";
import SignInComponent from "./sign-in.component";
import useSession from "src/app/use-session";
import { useRouter } from "next/navigation";
import { SignInMutation } from "../api";
import { toast } from "react-toastify";
import Spinner from "src/components/spinner";

interface ComponentProps {}

type Props = ComponentProps;

const SignInContainer: React.FunctionComponent<Props> = (props) => {
  const { login } = useSession();
  const loginMutation = SignInMutation();
  const router = useRouter();

  const onSigninSuccess = (username: string, token: string, id: string) => {
    login(
      { username, token, id },
      {
        optimisticData: {
          isLoggedIn: true,
          username,
          token,
          id,
        },
      }
    ).then((e) => {
      toast.success("Welcome!");
      router.push("/");
    });
  };

  const onSignInClick = useCallback(
    async (username: string, password: string) => {
      return loginMutation.mutate({
        username,
        password,
        onSuccess: onSigninSuccess,
      });
    },
    []
  );

  return (
    <>
      <SignInComponent onSignInClick={onSignInClick} />
      <Spinner show={loginMutation.isLoading} />
    </>
  );
};

export default SignInContainer;
