import { useState } from "react";
import { Link } from "react-router";

import { apiAuthHooks } from "../../hooks/tanstack/auth";
import Logo from "../../components/layouts/Logo";

const { useLogin } = apiAuthHooks;

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const Form = () => {
    const { isPending, error, mutate: mutateLogin } = useLogin();

    const [form, setForm] = useState(initialValues);

    // handlers
    const handleInput = (e, field) => {
      setForm((state) => {
        return { ...state, [field]: e.target.value };
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      mutateLogin(form);
    };

    //
    const Error = () => {
      if (!error) return null;
      const defaultError = "Unexpected error. Please try again";

      return (
        <div
          role="alert"
          className="alert alert-error alert-soft text-white mb-[10px]"
        >
          {/* <span>{error.response.data.message}</span> */}
          <span className="font-semibold text-gray-700 line-clamp-[3]">
            {error?.response?.data?.message ?? defaultError}
          </span>
        </div>
      );
    };

    return (
      <div className="w-full min-h-[400px]">
        <Error />
        <form onSubmit={handleSubmit}>
          <div className="space-y-[20px]">
            <div className="">
              <h2 className="text-[24px] font-bold text-gray-600">Login</h2>
              <p className="text-[16px] font-medium text-gray-400">
                Sign in and connect with your friends now
              </p>
            </div>

            <div className="flex flex-col gap-[10px] mt-[30px]">
              <div className="w-full space-y-[4px]">
                <label htmlFor="email" className="label">
                  <span className="">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  autoComplete="true"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => handleInput(e, "email")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-full space-y-[4px]">
                <label htmlFor="password" className="label">
                  <span className="">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={(e) => handleInput(e, "password")}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-[16px] px-[10px] py-[24px] mt-[10px]"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : null}
                {isPending ? "Login..." : "Login"}
              </button>

              <div className="text-center">
                <p className="text-[14px] font-medium text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[14px] text-primary hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full bg-transparent p-[20px]">
      <div className="mb-[25px] md:mb-[35px]">
        <Logo link={false} className="text-[28px] md:text-[32px]" />
      </div>

      <div className="w-full">
        <Form />
      </div>
    </div>
  );
};
export default LoginForm;
