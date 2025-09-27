import { Navigate, Route } from "react-router";

import AuthLayout from "../components/layouts/AuthLayout.jsx";
import SignUpPage from "../pages/auth/SignUpPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import OnboardingPage from "../pages/auth/OnboardingPage.jsx";

const AuthRoutes = ({ payload }) => {
  const { isAuthenticated, isOnboarded } = payload ?? {};

  //
  const Signup = () => {
    if (!isAuthenticated) {
      return (
        <AuthLayout payload={payload}>
          <SignUpPage />
        </AuthLayout>
      );
    }

    return <Navigate to={isOnboarded ? "/" : "/onboarding"} />;
  };
  const Login = () => {
    if (!isAuthenticated) {
      return (
        <AuthLayout payload={payload}>
          <LoginPage />
        </AuthLayout>
      );
    }

    return <Navigate to={isOnboarded ? "/" : "/onboarding"} />;
  };
  const OnBoarding = () => {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }
    if (!isOnboarded) {
      return (
        <AuthLayout payload={payload}>
          <OnboardingPage />;
        </AuthLayout>
      );
    }

    return <Navigate to={"/"} />;
  };

  return (
    <>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<OnBoarding />} />
    </>
  );
};
export default AuthRoutes;
