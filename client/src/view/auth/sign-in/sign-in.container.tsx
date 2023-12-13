"use client";

import React, { useCallback, useEffect } from "react";
import SignInComponent from "./sign-in.component";
import useSession from "src/app/use-session";
import { useRouter } from "next/navigation";
import { SignInMutation } from "../api";

interface ComponentProps {}

type Props = ComponentProps;

const SignInContainer: React.FunctionComponent<Props> = (props) => {
  const { login } = useSession();
  const loginMutation = SignInMutation();
  const router = useRouter();

  // useEffect(() => {})

  const onSigninSuccess = (username: string, token: string) => {
    console.log("token", token);
    login(
      { username, token },
      {
        optimisticData: {
          isLoggedIn: true,
          username,
          token,
        },
      }
    ).then((e) => {
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

  return <SignInComponent onSignInClick={onSignInClick} />;
};

export default SignInContainer;
