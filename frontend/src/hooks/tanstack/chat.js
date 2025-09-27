import { useQuery } from "@tanstack/react-query";

import { config } from "./config";
import { apiChat } from "../../lib/axios/chat";

const queryKeyStreamToken = config.keys.streamToken;
const { getStreamToken } = apiChat;

// queries
const useStreamToken = (payload) => {
  const { user } = payload;

  const queryStreamToken = useQuery({
    queryKey: [queryKeyStreamToken],
    queryFn: getStreamToken,
    enabled: !!user, // only runs when user is available
  });

  return queryStreamToken;
};

// mutations

export const apiChatHooks = {
  useStreamToken,
};
