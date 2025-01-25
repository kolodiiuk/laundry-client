
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        // Example: Adjusting Ag-Grid theme based on breakpoints
        MuiAgGridReact: {
            styleOverrides: {
                root: {
                    // Ensure Ag-Grid occupies full width on all screen sizes
                    width: '100%',
                    height: '100%',
                },
            },
        },
    },
    // Customize other theme properties as needed
});