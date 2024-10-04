// import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const listItems = [
    {
        id: 'INV-1234',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
        },
    },
    {
        id: 'INV-1233',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
        },
    },
    {
        id: 'INV-1232',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'C',
            name: 'Ciaran Murray',
            email: 'ciaran.murray@email.com',
        },
    },
    {
        id: 'INV-1231',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'M',
            name: 'Maria Macdonald',
            email: 'maria.mc@email.com',
        },
    },
    {
        id: 'INV-1230',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'C',
            name: 'Charles Fulton',
            email: 'fulton@email.com',
        },
    },
    {
        id: 'INV-1229',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'J',
            name: 'Jay Hooper',
            email: 'hooper@email.com',
        },
    },
];

export default function OrderList() {
    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            {listItems.map((listItem) => (
                <List key={listItem.id} sx={{ '--ListItem-paddingX': 0 }}>
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                        }}
                    >
                        <ListItemText sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                            <div>
                                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                                    {listItem.customer.name}
                                </Typography>
                                <Typography gutterBottom>
                                    {listItem.customer.email}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0.5,
                                        mb: 1,
                                    }}
                                >
                                    <Typography>{listItem.date}</Typography>
                                    <Typography>&bull;</Typography>
                                    <Typography>{listItem.id}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Link component="button">
                                        Download
                                    </Link>
                                </Box>
                            </div>
                        </ListItemText>
                        <Chip>
                            {/*{listItem.status}*/}
                        </Chip>
                    </ListItem>
                    <Divider />
                </List>
            ))}
            <Box
                className="Pagination-mobile"
                sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
            >
                <IconButton aria-label="previous page">
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography sx={{ mx: 'auto' }}>
                    Page 1 of 10
                </Typography>
                <IconButton aria-label="next page">
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
}