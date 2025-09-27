import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  StreamVideo,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import PageLoader from "../../components/loaders/PageLoader";

import { apiAuthHooks } from "../../hooks/tanstack/auth";
import { apiChatHooks } from "../../hooks/tanstack/chat";
import { useStreamCall } from "../../hooks/streams/call";
import AppWrapper from "../../components/layouts/AppWrapper";

const { useAuthUser } = apiAuthHooks;
const { useStreamToken } = apiChatHooks;

const CallPage = () => {
  const { id: callId } = useParams();

  const { data: dataAuth, isLoading: isLoadingUser } = useAuthUser();
  const { data: streamToken } = useStreamToken({ user: dataAuth?.user });
  const {
    loading: loadingCall,
    callClient,
    callChannel,
    initializeCall,
  } = useStreamCall();

  useEffect(() => {
    const payload = {
      streamToken: streamToken?.token,
      user: dataAuth?.user,
      callId,
    };
    initializeCall(payload);
  }, [streamToken?.token, dataAuth?.user, callId]);

  if (isLoadingUser || loadingCall) {
    return <PageLoader />;
  }
  if (!callClient || !callChannel) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Could not initialize call. Please refresh or try again later.</p>
      </div>
    );
  }

  const CallBlock = () => {
    return (
      <div className="w-full min-h-screen bg-primary/10 shadow-sm md:ounded-[10px] p-[10px] md:p-[20px]">
        <div className="w-full min-h-screen flex justify-center md:items-center pt-[50px] md:pt-0">
          <StreamVideo client={callClient}>
            <StreamCall call={callChannel}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        </div>
      </div>
    );
  };
  const LayoutBlock = ({ children }) => {
    return (
      <div className="w-full">
        <AppWrapper className="p-0! md:p-[20px]!">
          <div className="w-full min-h-screen">{children}</div>
        </AppWrapper>
      </div>
    );
  };

  return (
    <LayoutBlock>
      <CallBlock />
    </LayoutBlock>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();
  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
