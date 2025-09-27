import { useState } from "react";
import toast from "react-hot-toast";

import { StreamChat } from "stream-chat";

const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;
const initialValues = {};

export const useStreamChat = (payload) => {
  const { initialValues: payloadInitialValues = {} } = payload ?? {};

  // main
  const [form, setForm] = useState({
    ...initialValues,
    ...payloadInitialValues,
  });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  // streams
  const [chatClient, setChatClient] = useState(null);
  const [chatChannel, setChatChannel] = useState(null);

  // handlers
  const initializeChat = async (payload) => {
    const { streamToken, user, targetUserId } = payload;
    const clientUserId = user._id;

    if (!streamToken || !user) return;

    try {
      console.log("Initializing stream chat");

      const client = StreamChat.getInstance(streamApiKey);
      const payloadUserConnection = {
        id: clientUserId,
        name: user.fullName,
        image: user.profilePic,
      };
      await client.connectUser(payloadUserConnection, streamToken);

      // client starts chat -> channelId: [myId, targetId]
      // target starts chat -> channelId: [targetId, myId] => [myId,targetId]

      const channelId = [clientUserId, targetUserId].sort().join("-");
      const channelData = { members: [clientUserId, targetUserId] };
      const currentChannel = client.channel(
        "messaging",
        channelId,
        channelData
      );
      await currentChannel.watch();

      setChatClient(client);
      setChatChannel(currentChannel);
    } catch (error) {
      toast.error("Could not connect to chat. Please try again");
    } finally {
      setLoading(false);
    }
  };
  const handleVideoCall = () => {
    if (chatChannel) {
      const callUrl = `${window.location.origin}/call/${chatChannel.id}`;
      chatChannel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  const values = {
    form,
    loading,
    modal,
    //
    chatClient,
    chatChannel,
  };
  const handlers = {
    setForm,
    setLoading,
    setModal,
    //
    setChatClient,
    setChatChannel,
    //
    initializeChat,
    handleVideoCall,
  };
  const hooks = {
    ...values,
    ...handlers,
  };

  return hooks;
};
