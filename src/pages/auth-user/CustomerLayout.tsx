import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

export default function CustomerLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar variant="customer" />
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    p: 1, 
                    width: '95vw',
                    boxSizing: 'border-box',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}