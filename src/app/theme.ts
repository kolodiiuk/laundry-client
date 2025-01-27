
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
        MuiAgGridReact: {
            styleOverrides: {
                root: {
                    width: '100%',
                    height: '100%',
                },
            },
        },
    },
});