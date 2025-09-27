import CardFriend from "../components/cards/CardFriend";
import EmptyFriends from "../components/notFound/EmptyFriends";

import { apiFriendHooks } from "../hooks/tanstack/friends";
import AppWrapper from "../components/layouts/AppWrapper";

const { useUserFriends } = apiFriendHooks;

const FriendsPage = () => {
  // queries
  const { data: dataFriends = [], isLoading: isLoadingFriends } =
    useUserFriends();

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
      <div className="w-full min-h-dvh bg-white p-[20px] rounded-[10px]">
        <Header
          title={"Your Friends"}
          subtitle={"Reach out and connect right away"}
        />
        <hr className="border-gray-200 mt-[20px] mb-[40px]" />
        <List />
      </div>
    );
  };

  return (
    <div className="w-full">
      <AppWrapper>
        <div className="w-full py-[10px] md:py-[20px]">
          <Friends />
        </div>
      </AppWrapper>
    </div>
  );
};

export default FriendsPage;
