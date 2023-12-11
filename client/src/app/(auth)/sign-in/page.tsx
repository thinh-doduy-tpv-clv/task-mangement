import SignInContainer from "src/view/auth/sign-in/sign-in.container";
import { getSession, login, logout } from "../../action";
import { useCallback } from "react";

export default function SignIn() {
  return <SignInContainer />;
}
