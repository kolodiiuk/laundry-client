// import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {LocalLaundryServiceSharp, LoginSharp, MenuRounded, ShoppingCart} from "@mui/icons-material";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle.tsx";
import Tooltip from "@mui/material/Tooltip";

export default function Header() {
    // const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'space-between', borderBottom: "0px solid"}}>
            <LocalLaundryServiceSharp
                color={"secondary"}
                sx={{
                    display: {xs: 'none', sm: 'flex'},
                    minHeight: "64px",
                    fontSize: "34px"
                }}/>
            <Stack
                display={"flex"}
                direction="row"
                spacing={1}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: {xs: 'none', sm: 'flex'},
                }}
            >

                <Button
                    href={"/main"}
                    sx={{alignSelf: 'center'}}
                >
                    Main
                </Button>
                <Button
                    href={"/services"}
                    sx={{alignSelf: 'center'}}
                >
                    Services
                </Button>
                <Button
                    href={"/about"}
                    sx={{alignSelf: 'center'}}
                >
                    About us
                </Button>
            </Stack>
            <Box sx={{display: {xs: 'inline-flex', sm: 'none'}}}>
                <IconButton>
                    <MenuRounded/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1.5,
                    alignItems: 'center',
                }}
            >
                <Tooltip title={"Basket"}>
                    <IconButton
                        color={"secondary"}
                        href={"/basket"}
                    >
                        <ShoppingCart/>
                    </IconButton>
                </Tooltip>
                <ColorSchemeToggle/>
                <Tooltip title={"Log in/Register"}>
                    <IconButton
                        href={"/login"}
                        color={"secondary"}
                        sx={{maxWidth: '32px', maxHeight: '32px'}}
                    >
                        <LoginSharp/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
