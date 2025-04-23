import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

function MainLayout() {
    return (
        <div className="body-main">
            <main className="content">
                <h1>Gerador de Ordem</h1>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;