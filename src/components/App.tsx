import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../app/layout/main-layout/Layout.tsx';
import Header from '../app/layout/main-layout/Header.tsx';
import {ThemeProvider} from "@mui/material";
import {theme} from "../theme.ts"
import {Outlet, useLocation} from "react-router-dom";
import MainPage from "../pages/main/MainPage.tsx";

export default function App() {
    const location = useLocation();

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Layout.Root>
                    <Layout.Header>
                        <Header/>
                    </Layout.Header>
                    {location.pathname === '/' ? (
                        <Layout.Main>
                            <MainPage/>
                        </Layout.Main>
                    ) : (
                        <Layout.Main>
                            <Outlet/>
                        </Layout.Main>
                    )}
                </Layout.Root>
            </ThemeProvider>
        </>
    );
}
