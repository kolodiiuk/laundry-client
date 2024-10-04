import {useColorScheme} from "@mui/material/styles";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

export default function ColorSchemeToggle() {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton color="primary"/>;
    }
    return (
        <Tooltip title="Change theme">
            <IconButton
                color={"secondary"}
                data-screenshot="toggle-mode"
                sx={{alignSelf: 'center'}}
                onClick={() => {
                    if (mode === 'light') {
                        setMode('dark');
                    } else {
                        setMode('light');
                    }
                }}
            >
                {mode === 'light' ? <DarkModeRoundedIcon/> : <LightModeRoundedIcon/>}
            </IconButton>
        </Tooltip>
    );
}