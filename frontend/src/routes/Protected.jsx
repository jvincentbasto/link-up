import { Navigate, Route } from "react-router";

import AppLayout from "../components/layouts/AppLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import FriendsPage from "../pages/FriendsPage.jsx";
import NotificationsPage from "../pages/NotificationsPage.jsx";

const ProtectedRoutes = ({ payload }) => {
  const { isAuthenticated, isOnboarded } = payload ?? {};

  //
  const Home = () => {
    if (!isAuthenticated) {
      return <Navigate to={isOnboarded ? "/login" : "/onboarding"} />;
    }

    return (
      <AppLayout payload={payload} showSidebar={true}>
        <HomePage />
      </AppLayout>
    );
  };
  const Friends = () => {
    if (!isAuthenticated) {
      return <Navigate to={isOnboarded ? "/login" : "/onboarding"} />;
    }

    return (
      <AppLayout payload={payload} showSidebar={true}>
        <FriendsPage />
      </AppLayout>
    );
  };
  const Notifications = () => {
    if (!isAuthenticated) {
      return <Navigate to={isOnboarded ? "/login" : "/onboarding"} />;
    }

    return (
      <AppLayout payload={payload} showSidebar={true}>
        <NotificationsPage />
      </AppLayout>
    );
  };

  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/notifications" element={<Notifications />} />
    </>
  );
};
export default ProtectedRoutes;
