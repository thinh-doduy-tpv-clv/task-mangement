import React, { useState } from "react";
import ForgotPasswordComponent from "./forgot-password.component";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const ForgotPasswordContainer: React.FunctionComponent<Props> = () => {
  return <ForgotPasswordComponent />;
};

export default ForgotPasswordContainer;
