import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderForm from "./pages/order-form/OrderForm";
import MainLayout from "./layouts/MainLayout";
import OrderList from "./pages/order-list/OrderList";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<OrderForm />} />
                    <Route path="/list" element={<OrderList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;