import { Navigate, Route } from "react-router";

import AppLayout from "../components/layouts/AppLayout.jsx";

import CallPage from "../pages/streams/CallPage.jsx";
import ChatPage from "../pages/streams/ChatPage.jsx";

const StreamRoutes = ({ payload }) => {
  const { isAuthenticated, isOnboarded } = payload ?? {};

  //
  const Chat = () => {
    if (!isAuthenticated || !isOnboarded) {
      return <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />;
    }

    return (
      <AppLayout payload={payload} showSidebar={true}>
        <ChatPage />
      </AppLayout>
    );
  };
  const Call = () => {
    if (!isAuthenticated || !isOnboarded) {
      return <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />;
    }

    return (
      <AppLayout payload={payload} showSidebar={false}>
        <CallPage />
      </AppLayout>
    );
  };

  return (
    <>
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/call/:id" element={<Call />} />
    </>
  );
};
export default StreamRoutes;
