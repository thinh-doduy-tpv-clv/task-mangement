import React, { useState } from "react";
import SignUpComponent from "./sign-up.component";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const SignUpContainer: React.FunctionComponent<Props> = () => {
  return <SignUpComponent />;
};

export default SignUpContainer;
