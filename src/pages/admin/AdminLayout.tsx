import { Box } from "@mui/material";
import Sidebar from "../../components/common/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar variant="admin" />
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
