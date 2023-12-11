"use client";

import React, { useCallback } from "react";
import SignInComponent from "./sign-in.component";
import useSession from "src/app/use-session";
import { useRouter } from "next/navigation";

interface ComponentProps {}

type Props = ComponentProps;

const SignInContainer: React.FunctionComponent<Props> = (props) => {
  const { login } = useSession();
  const router = useRouter();

  const onSignInClick = useCallback((username: string, password: string) => {
    login(username, {
      optimisticData: {
        isLoggedIn: true,
        username,
      },
    }).then((e) => {
      router.push("/");
    });
  }, []);

  return <SignInComponent onSignInClick={onSignInClick} />;
};

export default SignInContainer;
