import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {listItemButtonClasses} from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ColorSchemeToggle from './ColorSchemeToggle.tsx';
import {closeSidebar} from '../../utils.ts';

export default function Sidebar() {
  return (
    <Paper
      className="Sidebar"
      sx={{
        position: {xs: 'fixed', md: 'sticky'},
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        minHeight: '95dvh',
        height: '100%',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--material-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Typography>My Laundry</Typography>
        <ColorSchemeToggle/>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Typography>Orders</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Typography>Coupons</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Typography>Services</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Typography>Statistics</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <Divider/>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Box sx={{minWidth: 0, flex: 1}}>
          <Typography>Siriwat K.</Typography>
          <Typography>siriwatk@test.com</Typography>
        </Box>
        <IconButton>
          <LogoutRoundedIcon/>
        </IconButton>
      </Box>
    </Paper>
  );
}
