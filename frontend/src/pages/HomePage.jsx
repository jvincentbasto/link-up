import { useEffect, useState } from "react";

import CardFriend from "../components/cards/CardFriend";
import EmptyFriends from "../components/notFound/EmptyFriends";

import { apiFriendHooks } from "../hooks/tanstack/friends";
import AppWrapper from "../components/layouts/AppWrapper";
import CardSuggestedUsers from "../components/cards/CardSuggestedUsers";
import CardFriendRequestOutgoing from "../components/cards/CardFriendRequestOutgoing";
import EmptySuggestedUsers from "../components/notFound/EmptySuggestedUsers";

const {
  useUserFriends,
  useRecommendedUsers,
  useOutgoingFriendRequests,
  useFriendRequests,
} = apiFriendHooks;

const HomePage = () => {
  // queries
  const { data: dataFriends = [], isLoading: isLoadingFriends } =
    useUserFriends();
  const { data: dataFriendRequests = {}, isLoading: isLoadingFriendRequests } =
    useFriendRequests();
  const {
    data: dataRecommendedUsers = [],
    isLoading: isLoadingRecommendedUsers,
  } = useRecommendedUsers();
  const {
    data: dataOutgoingFriendRequests = [],
    isLoading: isLoadingOutgoingFriendRequests,
  } = useOutgoingFriendRequests();

  //
  const incomingRequests = dataFriendRequests?.incoming || [];

  //
  const Header = ({ title = "", subtitle = "" }) => {
    return (
      <div className="w-full">
        <div className="">
          <h2 className="text-[28px] font-bold tracking-tight leading-[1.4] text-neutral-800">
            {title}
          </h2>
          <p className="text-[14px] font-medium text-base-content/50">
            {subtitle}
          </p>
        </div>
      </div>
    );
  };
  const Friends = () => {
    const list = dataFriends;

    const List = () => {
      if (isLoadingFriends) {
        return (
          <div className="w-full h-[300px] flex justify-center">
            <span className="loading loading-spinner loading-xl" />
          </div>
        );
      }
      if (list.length === 0) {
        return (
          <div className="w-full mt-[40px] mb-[20px]">
            <EmptyFriends />
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] mt-[20px]">
          {list.map((user) => (
            <CardFriend key={user._id} user={user} />
          ))}
        </div>
      );
    };

    return (
      <div className="w-full bg-white p-[20px] rounded-[10px] mb-[10px] md:mb-[20px]">
        <Header
          title={"Your Friends"}
          subtitle={"Reach out and connect right away"}
        />
        <List />
      </div>
    );
  };
  const RecommendedUsers = () => {
    const list = dataRecommendedUsers;

    const List = () => {
      if (isLoadingRecommendedUsers || isLoadingFriendRequests) {
        return (
          <div className="w-full h-[300px] flex justify-center">
            <span className="loading loading-spinner loading-xl" />
          </div>
        );
      }
      if (list.length === 0) {
        return (
          <div className="w-full mt-[40px] mb-[20px]">
            <EmptySuggestedUsers />
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] mt-[20px]">
          {list.map((user) => {
            const sentRequests = dataOutgoingFriendRequests.filter((f = {}) => {
              const userId = f?.recipient?._id;
              return userId === user._id;
            });
            const recieveRequests = incomingRequests.filter((f = {}) => {
              const userId = f?.sender?._id;
              return userId === user._id;
            });

            const requestSent =
              sentRequests.length > 0 ? sentRequests[0] : null;
            const requestRecieve =
              recieveRequests.length > 0 ? recieveRequests[0] : null;

            return (
              <CardSuggestedUsers
                key={user?._id}
                user={user}
                requestSent={requestSent}
                requestRecieve={requestRecieve}
              />
            );
          })}
        </div>
      );
    };

    return (
      <div className="w-full bg-white p-[20px] rounded-[10px] mb-[10px] md:mb-[20px]">
        <Header
          title={"Friend Suggestions"}
          subtitle={"Discover users who match your interests"}
        />
        <List />
      </div>
    );
  };
  const SentFriendRequests = () => {
    const list = dataOutgoingFriendRequests;

    const List = () => {
      if (isLoadingOutgoingFriendRequests) {
        return (
          <div className="w-full h-[300px] flex justify-center">
            <span className="loading loading-spinner loading-xl" />
          </div>
        );
      }
      if (list.length === 0) {
        return (
          <div className="w-full mt-[40px] mb-[20px]">
            <EmptySuggestedUsers />
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[20px] mt-[20px]">
          {list.map((request) => {
            return (
              <CardFriendRequestOutgoing key={request?._id} request={request} />
            );
          })}
        </div>
      );
    };

    return (
      <div className="w-full min-h-[400px] bg-white p-[20px] rounded-[10px]">
        <Header
          title={"Sent Requests"}
          subtitle={"See who you've invited to connect."}
        />
        <List />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen">
      <AppWrapper>
        <div className="w-full py-[10px] md:py-[20px]">
          <Friends />
          <RecommendedUsers />
          <SentFriendRequests />
        </div>
      </AppWrapper>
    </div>
  );
};

export default HomePage;
