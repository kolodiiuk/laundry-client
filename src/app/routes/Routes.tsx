import { createBrowserRouter } from 'react-router-dom';
// import RequireAuth from "./RequireAuth.tsx";
import App from "../../components/App.tsx";
import AboutPage from "../../pages/about/AboutPage.tsx";
import LoginPage from "../../pages/login/LoginPage.tsx";
import RegisterPage from "../../pages/login/RegisterPage.tsx";
import BasketPage from "../../pages/basket/BasketPage.tsx";
import ServicesPage from "../../pages/services/ServicesPage.tsx";
import MainPage from "../../pages/main/MainPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            // {
            //     element: <RequireAuth />, children: [
            //         { path: '/orders', element: < /> },
            //     ]
            // },
            // {
            //     element: <RequireAuth roles={['Admin']} />, children: [
            //         { path: '/orders', element: < /> },
            //     ]
            // },
            { path: '/about', element: <AboutPage /> },
            { path: '/services', element: <ServicesPage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/register', element: <RegisterPage /> },
            // { path: '/basket', element: <BasketPage /> },
            { path: '*', element: <MainPage/>},
        ],
    }
]);
