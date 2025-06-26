
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <div className="bg-primary">
                <NavBar />
            </div>

            <div className="flex-1  w-full">
                <Outlet />
            </div>

            <div className="w-full bg-primary ">
                <Footer />
            </div>
        </main>
    );
};

export default Layout;
