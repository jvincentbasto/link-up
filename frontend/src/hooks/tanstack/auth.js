import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { config } from "./config";
import { apiAuth } from "../../lib/axios/auth";
import toast from "react-hot-toast";

const keys = config.keys;
const { signup, login, logout, onBoarding, getAuthUser } = apiAuth;

// queries
const useAuthUser = () => {
  const queryAuthUser = useQuery({
    queryKey: [keys.authUser],
    queryFn: getAuthUser,
    retry: false,
  });

  return queryAuthUser;
};

// mutations | main
const useSignup = () => {
  const queryClient = useQueryClient();

  const mutationSignup = useMutation({
    mutationFn: signup,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keys.authUser] }),
  });

  return mutationSignup;
};
const useLogin = () => {
  const queryClient = useQueryClient();

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keys.authUser] }),
  });

  return mutationLogin;
};
const useLogout = () => {
  const queryClient = useQueryClient();

  const mutationLogout = useMutation({
    mutationFn: logout,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [keys.authUser] }),
  });

  return mutationLogout;
};
const useOnBoarding = () => {
  const queryClient = useQueryClient();

  const mutationOnBoarding = useMutation({
    mutationFn: onBoarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: [keys.authUser] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return mutationOnBoarding;
};

export const apiAuthHooks = {
  // queries
  useAuthUser,
  // mutations | main
  useSignup,
  useLogin,
  useLogout,
  useOnBoarding,
};
