import { useLocation } from "react-router";

import Navbar from "./Navbar";

const AuthLayout = ({ children, payload = {} }) => {
  const location = useLocation();

  const pathname = location.pathname;
  const isAuth =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isOnboarding = pathname.startsWith("/onboarding");

  const Hero = () => {
    return (
      <div className="size-full bg-gray-100 flex justify-center items-center">
        <div className="size-full relative">
          <div className="size-full">
            <img
              src="/assets/images/bg5.jpg"
              alt="Hero"
              className="size-full object-cover"
            />
          </div>

          <div className="size-full bg-linear-to-b from-[20%] from-transparent to-white absolute top-0 backdrop-blur-[1px]">
            <div className="w-full space-y-[10px] p-[10px] md:p-[40px] mt-[20px] absolute bottom-0">
              <h2 className="text-[40px] leading-[1.1] font-black text-blue-950 capitalize">
                Your gateway to global connections
              </h2>
              <p className="text-[14px] font-black text-blue-900">
                Message, call, and discover new friends anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const AuthBlock = ({ children }) => {
    if (!isAuth) return null;

    return (
      <div className="w-full max-w-5xl flex flex-col md:flex-row mx-auto bg-base-200 rounded-md shadow-lg overflow-hidden relative z-[10]">
        <div className="w-full md:w-1/2 hidden md:inline-block">
          <Hero />
        </div>
        <div className="w-full md:w-[70%] lg:w-1/2 flex flex-col p-[10px] md:p-[20px]">
          {children}
        </div>
      </div>
    );
  };
  const OnBoardingBlock = ({ children }) => {
    if (!isOnboarding) return null;

    return children;
  };

  const bgStyles =
    "bg-[url(/assets/images/bg5.jpg)] bg-cover bg-no-repeat bg-center";

  return (
    <div className={`min-h-screen flex flex-col`}>
      <Navbar
        payload={payload}
        className={"bg-base-300! backdrop-blur-[2px] fixed! shadow-2xl!"}
      />
      <div
        className={`min-h-screen flex justify-center items-center p-[20px] relative ${bgStyles} pt-[100px]`}
      >
        <div className="size-full absolute inset-0 bg-white/20 backdrop-blur-[4px]"></div>
        <AuthBlock>{children}</AuthBlock>
        <OnBoardingBlock>{children}</OnBoardingBlock>
      </div>
    </div>
  );
};
export default AuthLayout;
