import { Route, Routes } from "react-router";

// routes
import AuthRoutes from "./Auth.jsx";
import ProtectedRoutes from "./Protected.jsx";
import StreamRoutes from "./Stream.jsx";
import Logo from "../components/layouts/Logo.jsx";

const AppRoutes = ({ payload }) => {
  // const { user, isAuthenticated, isOnboarded } = payload = {}

  const NotFoundPage = () => (
    <div className="min-h-screen">
      <div className="navbar bg-white p-[20px] sticky top-0 left-0 shadow-sm">
        <Logo className="" />
      </div>
      <div className="w-full min-h-screen">
        <div className="w-full min-h-dvh flex justify-center items-center mt-[-60px]">
          <h1 className="text-[26px] md:text-[40px] font-black text-gray-600">
            404 - Page Not Found
          </h1>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      {AuthRoutes({ payload })}
      {ProtectedRoutes({ payload })}
      {StreamRoutes({ payload })}
      {/*  */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
