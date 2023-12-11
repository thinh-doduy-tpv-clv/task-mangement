import React, { useState } from "react";
import SignInComponent from "./sign-in.component";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const SignInContainer: React.FunctionComponent<Props> = () => {
  return <SignInComponent />;
};

export default SignInContainer;
