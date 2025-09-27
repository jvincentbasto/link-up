import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { config } from "./config";
import { apiUser } from "../../lib/axios/user";

const keys = config.keys;
const {
  // friends
  getRecommendedUsers,
  getUserFriends,
  unfriend,
  // friend requests
  getFriendRequests,
  getOutgoingFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
} = apiUser;

// queries
const useRecommendedUsers = () => {
  const queryRecommendedUsers = useQuery({
    queryKey: [keys.recommendedUsers],
    queryFn: getRecommendedUsers,
  });
  return queryRecommendedUsers;
};
const useUserFriends = () => {
  const queryUserFriends = useQuery({
    queryKey: [keys.userFriends],
    queryFn: getUserFriends,
  });

  return queryUserFriends;
};
const useFriendRequests = () => {
  const queryFriendRequests = useQuery({
    queryKey: [keys.friendRequests],
    queryFn: getFriendRequests,
  });

  return queryFriendRequests;
};
const useOutgoingFriendRequests = () => {
  const queryOutgoingFriendRequests = useQuery({
    queryKey: [keys.outgoingFriendRequests],
    queryFn: getOutgoingFriendRequests,
  });

  return queryOutgoingFriendRequests;
};

// mutations
const useUnfriend = () => {
  const queryClient = useQueryClient();

  const queryAcceptFriendRequest = useMutation({
    mutationFn: unfriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.friendRequests] });
      queryClient.invalidateQueries({ queryKey: [keys.userFriends] });
    },
  });

  return queryAcceptFriendRequest;
};
const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  const queryOutgoingFriendRequests = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [keys.outgoingFriendRequests],
      }),
  });

  return queryOutgoingFriendRequests;
};
const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  const queryAcceptFriendRequest = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.friendRequests] });
      queryClient.invalidateQueries({ queryKey: [keys.userFriends] });
      queryClient.invalidateQueries({
        queryKey: [keys.recommendedUsers],
      });
    },
  });

  return queryAcceptFriendRequest;
};
const useCancelFriendRequest = () => {
  const queryClient = useQueryClient();

  const queryCancelFriendRequest = useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [keys.outgoingFriendRequests],
      });
      queryClient.invalidateQueries({
        queryKey: [keys.recommendedUsers],
      });
    },
  });

  return queryCancelFriendRequest;
};

export const apiFriendHooks = {
  // queries
  useRecommendedUsers,
  useUserFriends,
  useOutgoingFriendRequests,
  useFriendRequests,
  // mutations
  useUnfriend,
  useSendFriendRequest,
  useAcceptFriendRequest,
  useCancelFriendRequest,
};
