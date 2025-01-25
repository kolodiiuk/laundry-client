import { Box } from "@mui/material";
import Sidebar from "../../components/common/Sidebar"; // Sidebar is commented out
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar variant="admin" />
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    p: 1, 
                    // overflow: 'auto', 
                    width: '95vw', // Ensure full width when Sidebar is absent
                    boxSizing: 'border-box',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
