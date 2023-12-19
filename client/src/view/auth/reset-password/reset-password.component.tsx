import { useForm } from "react-hook-form";
import { UserVM } from "src/core/view-models/auth/user-vm";

interface ComponentProps {
  user?: any;
  onSubmit: (user: UserVM) => void;
}

type Props = ComponentProps;

const ResetPasswordComponent: React.FunctionComponent<Props> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const newPassword = watch("password", "");

  const password = watch("password", ""); // Get the value of the "password" field
  const passwordConfirm = watch("passwordConfirm", ""); // Get the value of the "passwordConfirm" field

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
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
            onSubmit={handleSubmit((data) => {
              // props.onSignInClick(data.username, data.password);
              props.onSubmit({
                password: data.password,
              } as UserVM);
            })}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Abc@1234"
                {...register("password", {
                  required: true,
                  validate: (value) =>
                    value === passwordConfirm || "Passwords do not match",
                })}
              />
              {errors.password && (
                <p className={"error-field"}>Password is required.</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Abc@1234"
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.passwordConfirm && (
                <p className={"error-field"}>Password Confirm is required.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordComponent;
