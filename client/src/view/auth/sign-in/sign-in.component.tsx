"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSession from "src/app/use-session";

interface ComponentProps {
  onSignInClick: (username: string, password: string) => void;
}

type Props = ComponentProps;

type SignInFormData = {
  username: string;
  password: string;
};

const SignInComponent: React.FunctionComponent<Props> = (props) => {
  const { login } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    username: "",
    password: "",
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          TaskManagement
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit((data) => {
                props.onSignInClick(data.username, data.password);
              })}
              method="POST"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User name
                </label>
                <input
                  {...register("username", { required: true })}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your username"
                  // onChange={(e) => {
                  //   setSignInFormData((prev) => ({
                  //     ...prev,
                  //     username: e.target?.value || "",
                  //   }));
                  // }}
                />

                {errors.username && (
                  <p className={"error-field"}>User name is required.</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="error-field">password is required.</p>
                )}
              </div>
              <div className="flex items-center justify-between my-2">
                <Link
                  href="reset-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="submit"
                className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                {`Don’t have an account yet?`}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInComponent;
