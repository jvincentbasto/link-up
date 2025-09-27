import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = ({ children, payload = {}, showSidebar = false }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar payload={payload} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default AppLayout;
