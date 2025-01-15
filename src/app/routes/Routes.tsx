import {createBrowserRouter} from 'react-router-dom';
import App from "../../components/App.tsx";
import AboutPage from "../../pages/about/AboutPage.tsx";
import LoginPage from "../../pages/login/LoginPage.tsx";
import RegisterPage from "../../pages/login/RegisterPage.tsx";
import ServicesPage from "../../pages/services/ServicesPage.tsx";
import MainPage from "../../pages/main/MainPage.tsx";
import BasketPage from '../../pages/basket/BasketPage.tsx';

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
      {path: '/about', element: <AboutPage/>},
      {path: '/services', element: <ServicesPage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/register', element: <RegisterPage/>},
      {path: '/custprofile', element: <></>},
      {path: '/adminprofile', element: <></>},  // consider adding separate routes for each page whatever
      {path: '/basket', element: <BasketPage/>},
      {path: '*', element: <MainPage/>},
    ],
  }
]);
