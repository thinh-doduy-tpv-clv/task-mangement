"use client";

import React, { useState } from "react";
import ForgotPasswordComponent from "./forgot-password.component";
import { UserVM } from "src/core/view-models/auth/user-vm";
import { requestNewPasswordMutation, resetPasswordMutation } from "./useRequest";
import useSession from "src/app/use-session";
import { toast } from "react-toastify";
import ResetPasswordComponent from "./reset-password.component";
import { routerPaths } from "src/core/lib/router";
import { useRouter } from "next/navigation";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const ForgotPasswordContainer: React.FunctionComponent<Props> = () => {
  const router = useRouter();
  const requestPasswordMutate = requestNewPasswordMutation();
  const resetPasswordMutate = resetPasswordMutation();
  const [resetPasswordData, setResetPasswordData] = useState<{
    link: string;
    newPassword: string;
  }>({
    link: "",
    newPassword: "",
  });

  const onSuccessRequestPassword = (isSuccess: boolean, data?: any) => {
    if (isSuccess) {
      if (data && data.link) {
        const requestLink = { link: data.link, newPassword: "" };
        setResetPasswordData(requestLink);
      }
      toast.info("Redirecting to reset password page...");
    }
  };

  const onSuccessResetPassword = (isSuccess: boolean, data?: any) => {
    if (isSuccess) {
      toast.success("Reset password successfully");
      router.push(routerPaths.signin);
    }
  };

  const requestNewPassword = (user: UserVM) => {
    console.log("user: ", user);
    requestPasswordMutate.mutate({
      onSuccess: onSuccessRequestPassword,
      user,
    });
  };

  const resetPasswordHandler = (user: UserVM) => {
    console.log('link: ', resetPasswordData.link);
    console.log('new password: ', user.password);
    user.link = resetPasswordData.link;
    resetPasswordMutate.mutate({
      onSuccess: onSuccessResetPassword,
      user
    });
  };

  return (
    <>
      {resetPasswordData && resetPasswordData.link ? (
        <ResetPasswordComponent onSubmit={resetPasswordHandler} />
      ) : (
        <ForgotPasswordComponent onSubmit={requestNewPassword} />
      )}
    </>
  );
};

export default ForgotPasswordContainer;
