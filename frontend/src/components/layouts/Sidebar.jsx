import { Link, useLocation } from "react-router";

import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

import { apiAuthHooks } from "../../hooks/tanstack/auth";
import Logo from "./Logo";
import AppWrapper from "./AppWrapper";

const { useAuthUser } = apiAuthHooks;

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { data: dataAuth } = useAuthUser();

  const Navs = () => {
    const iconStyles = "size-[20px] text-base-content opacity-[40%]";
    const navs = [
      {
        name: "Home",
        href: "/",
        Icon: ({ cn = "" }) => {
          return <HomeIcon className={`${iconStyles} ${cn}`} />;
        },
      },
      {
        name: "Friends",
        href: "/friends",
        Icon: ({ cn = "" }) => {
          return <UsersIcon className={`${iconStyles} ${cn}`} />;
        },
      },
      {
        name: "Notifications",
        href: "/notifications",
        Icon: ({ cn = "" }) => {
          return <BellIcon className={`${iconStyles} ${cn}`} />;
        },
      },
    ];

    return (
      <nav className="flex-1 space-y-[8px]">
        {navs.map((m) => {
          return (
            <Link
              key={m.name}
              to={m.href}
              className={`btn btn-ghost hover:bg-blue-50 border-none shadow-none w-full justify-start gap-[10px] px-[10px] normal-case ${
                currentPath === m.href ? "bg-blue-200 hover:bg-blue-200" : ""
              }`}
            >
              <m.Icon
                cn={`${
                  currentPath === m.href
                    ? "text-primary hover:text-primary opacity-[100%]"
                    : ""
                }`}
              />
              <span className="">{m.name}</span>
            </Link>
          );
        })}
      </nav>
    );
  };
  const Profile = () => {
    const Avatar = () => {
      //
      const getInitials = () => {
        const names = dataAuth?.user?.fullName?.split(" ");
        const map = names.map((name) => name[0]);
        const initials = map.join("").toUpperCase();

        return initials;
      };

      return (
        <div className="btn btn-circle avatar size-[40px] p-[4px] shadow-sm hover:bg-blue-100 focus:bg-blue-100">
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
      );
    };

    return (
      <div className="p-[20px] border-t-[2px] border-base-200">
        <div className="flex items-center gap-[10px]">
          <div className="">
            <Avatar />
          </div>
          <div className="flex-1 text-[14px]">
            <p className="font-bold text-gray-600 capitalize line-clamp-1">
              {dataAuth?.user?.fullName}
            </p>
            <p
              className={`text-[12px] font-medium flex items-center gap-[4px] ${"text-primary"}`}
            >
              <span className="inline-block size-[8px]  rounded-full bg-current" />
              <span className="inline-block text-current">Online</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-[250px] h-screen bg-white hidden lg:flex flex-col sticky top-0 left-0 shadow-lg">
      <AppWrapper>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full">
            <div className="navbar flex items-center">
              <Logo />
            </div>
            <hr className="border-gray-200 mb-[20px]" />
          </div>
          <div className="w-full h-full flex flex-col">
            <Navs />
            <Profile />
          </div>
        </div>
      </AppWrapper>
    </aside>
  );
};
export default Sidebar;
