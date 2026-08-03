import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
            <Navbar />
            <main
                style={{
                    minHeight: "80vh",
                    padding: "20px",
                }}
            >
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;