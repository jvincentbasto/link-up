import { Link, useLocation } from "react-router";

import AppWrapper from "./AppWrapper";
import Logo from "./Logo";

import ThemeSelector from "../ThemeSelector";
import { apiAuthHooks } from "../../hooks/tanstack/auth";

const { useAuthUser, useLogout } = apiAuthHooks;

const Navbar = ({ payload = {}, className = "" }) => {
  const { user, isAuthenticated, isOnboarded } = payload;

  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const isCallPage = location.pathname?.startsWith("/call");

  const { data: dataAuth } = useAuthUser();
  const { mutate: mutateLogout } = useLogout();

  const NavLogo = () => {
    if (!isAuthenticated || !isOnboarded) {
      return (
        <div className="inline-block">
          <Logo />
        </div>
      );
    }

    return (
      <div className="inline-block lg:hidden">
        <Logo />
      </div>
    );
  };
  const Profile = () => {
    if (!isAuthenticated) {
      return null;
    }

    const navs = [
      { name: "Friends", href: "/friends" },
      { name: "Notifications", href: "/notifications" },
      {
        name: "Logout",
        onClick: () => mutateLogout(),
      },
    ];

    //
    const getInitials = () => {
      const names = dataAuth?.user?.fullName?.split(" ");
      const map = names.map((name) => name[0]);
      const initials = map.join("").toUpperCase();

      return initials;
    };

    const Navs = () => {
      return (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 w-[200px] rounded-[10px] p-[10px] mt-[20px] z-1 shadow-md"
        >
          <li key={user?.fullName} aria-disabled>
            <span className="text-[16px] font-bold text-gray-800">
              {user?.fullName}
            </span>
          </li>
          <hr className="border-gray-200 mt-[5px] mb-[10px]" />
          {navs.map((m) => {
            const hasFn = typeof m.onClick === "function";

            if (hasFn) {
              return (
                <li key={m.name}>
                  <span onClick={m.onClick}>{m.name}</span>
                </li>
              );
            }

            return (
              <li key={m.name}>
                <Link to={m.href ?? "/"}>{m.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle avatar size-[40px] p-[4px] shadow-sm hover:bg-blue-100 focus:bg-blue-100"
        >
          <div className="w-full rounded-full relative">
            <img
              src={dataAuth?.user?.profilePic}
              // alt="Profile"
              className="size-full relative z-10"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="size-full bg-blue-50 rounded-full absolute top-0 left-0 flex justify-center items-center font-extrabold text-[18px]">
              {getInitials()}
            </div>
          </div>
        </div>
        <Navs />
      </div>
    );
  };

  return (
    <nav
      className={`navbar bg-white flex items-center sticky top-0 left-0 z-30 shadow-sm ${className}`}
    >
      <AppWrapper>
        <div className="w-full flex justify-between items-center mt-[4px]">
          {isCallPage ? <Logo /> : <NavLogo />}
          <span />
          <div className="flex justify-end items-center gap-[10px]">
            {/* <ThemeSelector /> */}
            <Profile />
          </div>
        </div>
      </AppWrapper>
    </nav>
  );
};
export default Navbar;
