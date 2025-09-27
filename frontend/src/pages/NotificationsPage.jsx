import EmptyNotifications from "../components/notFound/EmptyNotifications";

import { apiFriendHooks } from "../hooks/tanstack/friends";
import CardFriendRequest from "../components/cards/CardFriendRequest";
import AppWrapper from "../components/layouts/AppWrapper";

const { useFriendRequests } = apiFriendHooks;

const NotificationsPage = () => {
  const { isLoading: isLoadingFriendRequests, data: dataFriendRequests = {} } =
    useFriendRequests();

  //
  const incomingRequests = dataFriendRequests?.incoming || [];
  // const acceptedRequests = dataFriendRequests?.accepted || [];

  //
  const Header = ({ title = "", subtitle = "", count = 0 }) => {
    const Count = () => {
      if (count <= 0) return null;

      return (
        <span className="inline-block ml-[10px] text-[14px] px-[8px] pr-[9px] py-[2px] border shadow-sm rounded-full line-clamp-1 bg-primary! text-base-100! font-semibold! tracking-wider">
          {count}
        </span>
      );
    };

    return (
      <div className="w-full">
        <div className="">
          <h2 className="text-[28px] font-bold tracking-tight leading-[1.4] text-neutral-800">
            {title}
            <Count />
          </h2>
          <p className="text-[14px] font-medium text-base-content/50">
            {subtitle}
          </p>
        </div>
      </div>
    );
  };
  const IncomingRequests = () => {
    const list = incomingRequests;

    const List = () => {
      if (isLoadingFriendRequests) {
        return (
          <div className="w-full h-[300px] flex justify-center">
            <span className="loading loading-spinner loading-xl" />
          </div>
        );
      }
      if (list.length === 0) {
        return (
          <div className="w-full mt-[40px] mb-[20px]">
            <EmptyNotifications />
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] mt-[20px]">
          {list.map((request = {}) => (
            <CardFriendRequest key={request?._id} request={request} />
          ))}
        </div>
      );
    };

    return (
      <div className="w-full min-h-dvh bg-white p-[20px] rounded-[10px]">
        <Header
          title={"Friend Requests"}
          subtitle={"People who’d like to be your friend."}
          count={list?.length ?? 0}
        />
        <hr className="border-gray-200 mt-[20px] mb-[40px]" />
        <List />
      </div>
    );
  };

  return (
    <>
      <div className="w-full">
        <AppWrapper>
          <div className="w-full py-[10px] md:py-[20px]">
            <IncomingRequests />
          </div>
        </AppWrapper>
      </div>
    </>
  );
};
export default NotificationsPage;
