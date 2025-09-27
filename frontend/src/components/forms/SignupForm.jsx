import { useState } from "react";
import { Link } from "react-router";

import { apiAuthHooks } from "../../hooks/tanstack/auth";
import Logo from "../layouts/Logo";

const { useSignup } = apiAuthHooks;

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const Form = () => {
    const { isPending, error, mutate: mutateSignup } = useSignup();

    const [form, setForm] = useState(initialValues);

    // handlers
    const handleInput = (e, field) => {
      setForm((state) => {
        return { ...state, [field]: e.target.value };
      });
    };
    const handleLogin = (e) => {
      e.preventDefault();
      mutateSignup(form);
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
      <div className="w-full min-h-[450px]">
        <Error />
        <form onSubmit={handleLogin}>
          <div className="space-y-[20px]">
            <div className="">
              <h2 className="text-[24px] font-bold text-gray-600">
                Create Account
              </h2>
              <p className="text-[16px] font-medium text-gray-400">
                Get started now and bring your friends closer
              </p>
            </div>

            <div className="flex flex-col gap-[10px] mt-[30px]">
              <div className="w-full space-y-[4px]">
                <label htmlFor="fullName" className="label">
                  <span className="">Full Name</span>
                </label>
                <input
                  type="fullName"
                  placeholder="Full Name"
                  required
                  autoComplete="true"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => handleInput(e, "fullName")}
                  className="input input-bordered w-full"
                />
              </div>
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
                <p className="text-[14px] text-gray-600 mt-[4px]">
                  Password must be at least 6 characters long
                </p>
              </div>
              <div className="w-full space-y-[4px]">
                <label
                  htmlFor="contract"
                  className="label cursor-pointer justify-start gap-[10px]"
                >
                  <input
                    type="checkbox"
                    required
                    id="contract"
                    name="contract"
                    className="checkbox checkbox-sm"
                  />
                  <span className="text-[14px] leading-[1] font-medium text-gray-600">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline">
                      privacy policy
                    </span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-[16px] px-[10px] py-[24px] mt-[10px]"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : null}
                {isPending ? "Creating..." : "Create Account"}
              </button>

              <div className="text-center">
                <p className="text-[14px] font-medium text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[14px] text-primary hover:underline"
                  >
                    Login now!
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
export default SignupForm;
