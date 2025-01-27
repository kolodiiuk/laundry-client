import {createBrowserRouter} from 'react-router-dom';
import App from "../../components/App.tsx";
import AdminServices from "../../pages/admin/AdminServices";
import AdminOrders from "../../pages/admin/AdminOrders";
import AdminStats from "../../pages/admin/AdminStatistics";
import AdminCoupons from "../../pages/admin/AdminCoupons";
import CustomerProfile from "../../pages/auth-user/CustomerProfile";
import CustomerOrders from "../../pages/auth-user/CustomerOrders";
import LoginPage from '../../pages/LoginPage.tsx';
import RegisterPage from '../../pages/RegisterPage.tsx';
import ServicesPage from '../../pages/ServicesPage.tsx';
import AdminLayout from "../../pages/admin/AdminLayout";
import Checkout from '../../pages/Checkout.tsx';
import CustomerLayout from '../../pages/auth-user/CustomerLayout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: 'services', element: <ServicesPage/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'register', element: <RegisterPage/>},
      {path: 'checkout', element: <Checkout/>},
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {path: 'services', element: <AdminServices />},
          {path: 'orders', element: <AdminOrders />},
          {path: 'statistics', element: <AdminStats />},
          {path: 'coupons', element: <AdminCoupons />},
        ]
      },
      {
        path: 'profile',
        element: <CustomerLayout />,
        children: [
          {path: '', element: <CustomerProfile />},
          {path: 'orders', element: <CustomerOrders />},
        ]
      },
      {path: '', element: <ServicesPage/>},
    ],
  }
]);
