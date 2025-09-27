import { axiosInstance } from "./config";

// user friends
const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};
const unfriend = async (id) => {
  const url = `/users/unfriend/${id}`;

  const response = await axiosInstance.delete(url);
  return response.data;
};

// friend request
const getFriendRequests = async () => {
  const url = "/users/friend-requests";
  const response = await axiosInstance.get(url);

  return response.data;
};
const getOutgoingFriendRequests = async () => {
  const url = "/users/friend-requests/outgoing";
  const response = await axiosInstance.get(url);

  return response.data;
};
const sendFriendRequest = async (id) => {
  const url = `/users/friend-request/${id}`;
  const response = await axiosInstance.post(url);

  return response.data;
};
const acceptFriendRequest = async (id) => {
  const url = `/users/friend-request/${id}/accept`;

  const response = await axiosInstance.put(url);
  return response.data;
};
const cancelFriendRequest = async (id) => {
  const url = `/users/friend-request/${id}`;

  const response = await axiosInstance.delete(url);
  return response.data;
};

export const apiUser = {
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
};
