import {createBrowserRouter} from 'react-router-dom';
import App from "../../components/App.tsx";
import AboutPage from "../../pages/about/AboutPage.tsx";
import LoginPage from "../../pages/login/LoginPage.tsx";
import RegisterPage from "../../pages/login/RegisterPage.tsx";
import ServicesPage from "../../pages/services/ServicesPage.tsx";
import MainPage from "../../pages/main/MainPage.tsx";
import BasketPage from '../../pages/basket/BasketPage.tsx';
import AdminServices from "../../pages/admin/AdminServices";
import AdminOrders from "../../pages/admin/AdminOrders";
import AdminStats from "../../pages/admin/AdminStatistics";
import AdminCoupons from "../../pages/admin/AdminCoupons";
import CustomerProfile from "../../pages/auth-user/CustomerProfile";
import CustomerOrders from "../../pages/auth-user/CustomerOrders";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: 'main', element: <AboutPage/>},
      {path: 'services', element: <ServicesPage/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'register', element: <RegisterPage/>},
      {path: 'basket', element: <BasketPage/>},
      {
        path: 'admin',
        element: <App />,
        children: [
          {path: 'services', element: <AdminServices />},
          {path: 'orders', element: <AdminOrders />},
          {path: 'statistics', element: <AdminStats />},
          {path: 'coupons', element: <AdminCoupons />},
        ]
      },
      {
        path: 'profile',
        element: <App />,
        children: [
          {path: '', element: <CustomerProfile />},
          {path: 'orders', element: <CustomerOrders />},
        ]
      },
      {path: '', element: <MainPage/>},
    ],
  }
]);
