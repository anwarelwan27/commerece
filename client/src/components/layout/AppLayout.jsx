import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-[-120px] top-14 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute right-[-140px] top-56 h-96 w-96 rounded-full bg-emerald-400/14 blur-3xl" />
        <div className="absolute bottom-24 left-1/3 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute inset-x-0 top-36 h-[40rem] grid-backdrop opacity-20" />
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
