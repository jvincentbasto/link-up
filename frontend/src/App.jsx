import { Toaster } from "react-hot-toast";

import PageLoader from "./components/loaders/PageLoader.jsx";

import { useThemeStore } from "./store/useThemeStore.js";
import { apiAuthHooks } from "./hooks/tanstack/auth.js";
import AppRoutes from "./routes/App.jsx";

const { useAuthUser } = apiAuthHooks;

const App = () => {
  const { theme } = useThemeStore();
  const { data, isLoading } = useAuthUser();

  const user = data?.user;
  const isAuthenticated = Boolean(user);
  const isOnboarded = user?.isOnboarded;

  if (isLoading) {
    return <PageLoader />;
  }

  const payload = { user, isAuthenticated, isOnboarded };
  return (
    <div className="min-h-screen bg-base-200" data-theme={theme}>
      <AppRoutes payload={payload} />
      <Toaster />
    </div>
  );
};
export default App;
