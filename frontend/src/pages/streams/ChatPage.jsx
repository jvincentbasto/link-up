import { useEffect } from "react";
import { useParams } from "react-router";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import PageLoader from "../../components/loaders/PageLoader";
import CallButton from "../../components/buttons/CallButton";

import { apiAuthHooks } from "../../hooks/tanstack/auth";
import { apiChatHooks } from "../../hooks/tanstack/chat";
import { useStreamChat } from "../../hooks/streams/chat";
import AppWrapper from "../../components/layouts/AppWrapper";

const { useAuthUser } = apiAuthHooks;
const { useStreamToken } = apiChatHooks;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const { data: dataAuth, isLoading: isLoadingUser } = useAuthUser();
  const { data: streamToken } = useStreamToken({ user: dataAuth?.user });
  const {
    loading: loadingChat,
    chatClient,
    chatChannel,
    initializeChat,
    handleVideoCall,
  } = useStreamChat();

  useEffect(() => {
    const payload = {
      streamToken: streamToken?.token,
      user: dataAuth?.user,
      targetUserId,
    };
    initializeChat(payload);
  }, [streamToken?.token, dataAuth?.user, targetUserId]);

  if (isLoadingUser || loadingChat) {
    return <PageLoader />;
  }
  if (!chatClient || !chatChannel) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Could not initialize chat. Please refresh or try again later.</p>
      </div>
    );
  }

  const ChatBlock = () => {
    return (
      <div className="w-full bg-white rounded-[10px] p-[10px] md:p-[20px] h-full absolute inset-0 top-0">
        <Chat client={chatClient}>
          <Channel channel={chatChannel}>
            <div className="main-chat w-full relative">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    );
  };
  const LayoutBlock = ({ children }) => {
    return (
      <div className="w-full">
        <AppWrapper className="p-0! md:p-[20px]!">
          <div className="w-full min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-104px)] relative">
            {children}
          </div>
        </AppWrapper>
      </div>
    );
  };

  return (
    <LayoutBlock>
      <ChatBlock />
    </LayoutBlock>
  );
};
export default ChatPage;
