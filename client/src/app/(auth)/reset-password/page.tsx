import SignInContainer from "src/view/auth/sign-in/sign-in.container";
import { getSession, login, logout } from "../../action";
import { useCallback } from "react";
import ForgotPasswordContainer from "src/view/auth/reset-password/forgot-password.container";

export default function Page() {
  return <ForgotPasswordContainer />;
}
