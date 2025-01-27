import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {listItemButtonClasses} from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ColorSchemeToggle from './ColorSchemeToggle.tsx';
import {closeSidebar} from '../../utils.ts';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    variant?: 'admin' | 'customer';
}

export default function Sidebar({ variant = 'customer' }: SidebarProps) {
    const navigate = useNavigate();

    const adminItems = [
        { text: 'Services', path: '/admin/services' },
        { text: 'Orders', path: '/admin/orders' },
        { text: 'Coupons', path: '/admin/coupons' },
        { text: 'Statistics', path: '/admin/statistics' },
    ];

    const customerItems = [
        { text: 'Orders', path: '/profile/orders' },
        { text: 'Profile', path: '/profile' },
    ];

    const items = variant === 'admin' ? adminItems : customerItems;

    return (
        <Paper
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transition: 'width 0.4s',
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
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>{variant === 'admin' ? 'Admin Panel' : 'My Laundry'}</Typography>
                <ColorSchemeToggle/>
            </Box>
            
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'auto',
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
                    {items.map((item) => (
                        <ListItem key={item.path}>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemText>
                                    <Typography>{item.text}</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
    );
}
