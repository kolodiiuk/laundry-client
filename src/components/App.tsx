import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../app/layout/Layout.tsx';
import Header from '../app/layout/Header.tsx';
import {ThemeProvider} from "@mui/material";
import {theme} from "../theme.ts"
import {Outlet, useLocation} from "react-router-dom";
import MainPage from "../pages/main/MainPage.tsx";

export default function App() {
    const location = useLocation();
    const path = location.pathname;

    const isSpecialPage = 
        path.startsWith('/admin') || 
        path.startsWith('/profile') || 
        path === '/login' || 
        path === '/register';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Layout.Root>
                {!isSpecialPage && (
                    <Layout.Header>
                        <Header/>
                    </Layout.Header>
                )}
                <Layout.Main>
                    {path === '/' ? <MainPage/> : <Outlet/>}
                </Layout.Main>
            </Layout.Root>
        </ThemeProvider>
    );
}
