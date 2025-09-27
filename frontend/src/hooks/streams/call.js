import { useState } from "react";
import toast from "react-hot-toast";

import { StreamVideoClient } from "@stream-io/video-react-sdk";

const streamApiKey = import.meta.env.VITE_STREAM_API_KEY;
const initialValues = {};

export const useStreamCall = (payload) => {
  const { initialValues: payloadInitialValues = {} } = payload ?? {};

  // main
  const [form, setForm] = useState({
    ...initialValues,
    ...payloadInitialValues,
  });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  // streams
  const [callClient, setCallClient] = useState(null);
  const [callChannel, setCallChannel] = useState(null);

  // handlers
  const initializeCall = async (payload) => {
    const { streamToken, user, callId } = payload;

    if (!streamToken || !user || !callId) return;

    try {
      console.log("Initializing stream video");

      const payloadVideoClient = {
        id: user._id,
        name: user.fullName,
        image: user.profilePic,
      };
      const videoClient = new StreamVideoClient({
        apiKey: streamApiKey,
        user: payloadVideoClient,
        token: streamToken,
      });

      const callInstance = videoClient.call("default", callId);
      await callInstance.join({ create: true });
      console.log("Joined call successfully");

      setCallClient(videoClient);
      setCallChannel(callInstance);
    } catch (error) {
      toast.error("Could not join the call. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    form,
    loading,
    modal,
    //
    callClient,
    callChannel,
  };
  const handlers = {
    setForm,
    setLoading,
    setModal,
    //
    setCallClient,
    setCallChannel,
    //
    initializeCall,
  };
  const hooks = {
    ...values,
    ...handlers,
  };

  return hooks;
};
