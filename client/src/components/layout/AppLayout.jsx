import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute right-[-120px] top-64 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute inset-x-0 top-40 h-[32rem] grid-backdrop opacity-20" />
      </div>

      <Navbar />

      <main className="pb-20 pt-24 sm:pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
