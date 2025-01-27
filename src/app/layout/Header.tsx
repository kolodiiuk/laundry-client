import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {LocalLaundryServiceSharp, LoginSharp, LogoutSharp, MenuRounded, Person, ShoppingCart} from "@mui/icons-material";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle.tsx";
import Tooltip from "@mui/material/Tooltip";
import {Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/configureStore.ts';
import { logout } from '../store/slices/AuthSlice.ts';
import BasketDialog from "../../components/basket/BasketDialog";
import { useState } from 'react';
import { calculateBasketTotal, getBasket } from '../store/slices/BasketSlice.ts';
import { Role } from '../models/User.ts';

export default function Header() {
  const dispatch = useAppDispatch();
  const {user, isAuthenticated} = useAppSelector(state => state.auth)
  const [basketOpen, setBasketOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  }
  const openBasketDialog = () => {
    setBasketOpen(true);
    if (isAuthenticated) {
      dispatch(getBasket(user?.id ?? 0));
      dispatch(calculateBasketTotal())
    }
  }

  return (
    <Box sx={{
      display: 'flex', 
      flexGrow: 1, 
      justifyContent: 'space-between', 
      borderBottom: "1px solid"
      }}>
      <Box sx={{
        display: {xs: 'none', sm: 'flex'}, 
        flexDirection: 'row', 
        alignItems: 'center'}}>
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
            onClick={openBasketDialog}
          >
            <ShoppingCart/>
          </IconButton>
        </Tooltip>
        <ColorSchemeToggle/>
        <IconButton
          href={isAuthenticated 
            ? (user?.role === Role.Admin ? '/admin/orders' : '/profile')
            : '/'}
          color='secondary'
          sx={{maxWidth: '32px', maxHeight: '32px'}}
        >
          <Person/>
        </IconButton>
        <Tooltip title={"Log in/Register"}>
          <IconButton
            href={"/login"}
            color={"secondary"}
            sx={{maxWidth: '32px', maxHeight: '32px'}}
          >
            <LoginSharp/>
          </IconButton>
        </Tooltip>
        <IconButton
          color='secondary'
          onClick={handleLogout}
        >
          <LogoutSharp/>
        </IconButton>
        </Box>
        <BasketDialog
          open={basketOpen}
          onClose={() => {
            setBasketOpen(false)}
          }
        />
    </Box>
  );
}
