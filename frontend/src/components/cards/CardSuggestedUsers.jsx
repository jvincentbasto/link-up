import { Link } from "react-router";

import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";

import { apiFriendHooks } from "../../hooks/tanstack/friends";
const { useSendFriendRequest, useCancelFriendRequest, useAcceptFriendRequest } =
  apiFriendHooks;

const CardSuggestedUsers = ({ user, requestSent, requestRecieve }) => {
  const chatLink = `/chat/${user._id}`;

  const { mutate: sendRequestMutation, isPending: isPendingSendFriendRequest } =
    useSendFriendRequest();
  const {
    isPending: isPendingCancelFriendRequest,
    mutate: mutateCancelFriendRequest,
  } = useCancelFriendRequest();
  const {
    isPending: isPendingAcceptFriendReqeust,
    mutate: mutateAcceptFriendRequest,
  } = useAcceptFriendRequest();

  const Profile = () => {
    const Avatar = () => {
      //
      const getInitials = () => {
        const names = user?.fullName?.split(" ");
        const map = names.map((name) => name[0]);
        const initials = map.join("").toUpperCase();

        return initials;
      };

      return (
        <div className="btn btn-circle avatar size-[60px] p-[4px] shadow-sm hover:bg-blue-100 focus:bg-blue-100">
          <div className="w-full rounded-full relative">
            {user?.profilePic ? (
              <img
                src={user?.profilePic ?? ""}
                // alt="Profile"
                className="size-full relative z-10"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : null}
            <div className="size-full bg-blue-50 rounded-full absolute top-0 left-0 flex justify-center items-center font-extrabold text-[18px]">
              {getInitials()}
            </div>
          </div>
        </div>
      );
    };
    const Status = ({ status }) => {
      const statusColor = "text-primary";

      return (
        <p
          className={`text-[14px] font-medium flex items-center gap-[4px] ${statusColor}`}
        >
          <span className="inline-block size-[8px]  rounded-full bg-current" />
          <span className="inline-block text-current">Online</span>
        </p>
      );
    };

    return (
      <div className="w-full mb-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="">
            <Link to={chatLink}>
              <Avatar />
            </Link>
          </div>
          <div className="flex-1 text-[14px]">
            <p className="text-[16px] font-bold text-gray-800 capitalize leading-[1.2] line-clamp-1">
              {user?.fullName}
            </p>
            <p
              className={`text-[14px] font-medium capitalize text-gray-500 flex items-center gap-[4px]`}
            >
              {user?.location}
            </p>
            {/* <Status /> */}
          </div>
        </div>
      </div>
    );
  };
  const Body = () => {
    if (user?.bio?.trim() !== "") {
      return null;
    }

    return (
      <div className="w-full mb-[10px]">
        <p className="w-full text-[14px] text-gray-800 line-clamp-2">
          {user?.bio}
          {user?.nativeLanguage}
        </p>
      </div>
    );
  };
  const Action = () => {
    // btn color
    let btnColor = "btn-primary";
    // if (requestRecieve) btnColor = "btn-success";
    if (requestRecieve) btnColor = "btn-primary btn-soft";
    else if (requestSent) btnColor = "btn-error";

    const Icon = () => {
      const iconStyles = "size-[20px]";

      // title
      let title = "Add Friend";
      if (requestRecieve) title = "Accept";
      else if (requestSent) title = "Cancel Request";

      // title
      let IconCategory = () => {
        if (requestSent) {
          return null;
        }
        if (requestRecieve) {
          return <CheckCircleIcon className={`${iconStyles}`} />;
        }

        return <UserPlusIcon className={`${iconStyles}`} />;
      };

      return (
        <div className="w-full flex justify-center items-center gap-[10px] px-[10px]">
          <span className="">
            <IconCategory />
          </span>
          <span className="line-clamp-1">{title}</span>
        </div>
      );
    };

    return (
      <button
        className={`w-full btn btn-outline ${btnColor} 
        `}
        disabled={
          isPendingSendFriendRequest ||
          isPendingCancelFriendRequest ||
          isPendingAcceptFriendReqeust
        }
        onClick={() => {
          if (requestRecieve?._id) {
            mutateAcceptFriendRequest(requestRecieve?._id);
          } else if (requestSent?._id) {
            mutateCancelFriendRequest(requestSent?._id);
          } else {
            sendRequestMutation(user._id);
          }
        }}
      >
        <Icon />
      </button>
    );
  };

  return (
    <div className="card bg-white border  transition-all hover:shadow-sm">
      <div className="card-body p-[20px]">
        <Profile />
        <Body />
        <Action />
      </div>
    </div>
  );
};
export default CardSuggestedUsers;
