import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {LocalLaundryServiceSharp, LoginSharp, MenuRounded, ShoppingCart} from "@mui/icons-material";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle.tsx";
import Tooltip from "@mui/material/Tooltip";
import {Typography} from '@mui/material';

export default function Header() {
  return (
    <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'space-between', borderBottom: "1px solid"}}>
      <Box sx={{display: {xs: 'none', sm: 'flex'}, flexDirection: 'row', alignItems: 'center'}}>
        <LocalLaundryServiceSharp
          color={"secondary"}
          sx={{

            display: {xs: 'none', sm: 'flex'},
            minHeight: "64px",
            fontSize: "34px"
          }}/>
        <Typography fontWeight={700} fontSize={22}>My Laundry</Typography>
      </Box>
      <Stack
        display={"flex"}
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          display: {xs: 'none', sm: 'flex'},
          alignSelf: 'center'
        }}
      >

        <Button
          href={"/services"}
          sx={{alignSelf: 'center'}}
        >
          Services
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
            // href={"/basket"}
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
