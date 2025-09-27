import { useThemeStore } from "../../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen flex justify-center items-centerp p-[10px]"
      data-theme={theme}
    >
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};
export default PageLoader;
