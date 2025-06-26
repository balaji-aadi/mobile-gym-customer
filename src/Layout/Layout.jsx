import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <div className="relative flex-1 w-full">
        <div className="absolute top-0 left-0 w-full z-20">
          <NavBar />
        </div>
        <Outlet />
      </div>

      <div className="w-full bg-primary ">
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
