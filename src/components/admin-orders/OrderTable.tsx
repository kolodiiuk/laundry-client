/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton, {iconButtonClasses} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const rows = [
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
    {
        id: 'INV-1228',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'K',
            name: 'Krystal Stevens',
            email: 'k.stevens@email.com',
        },
    },
    {
        id: 'INV-1227',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'S',
            name: 'Sachin Flynn',
            email: 's.flyn@email.com',
        },
    },
    {
        id: 'INV-1226',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'B',
            name: 'Bradley Rosales',
            email: 'brad123@email.com',
        },
    },
    {
        id: 'INV-1225',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'O',
            name: 'Olivia Ryhe',
            email: 'olivia@email.com',
        },
    },
    {
        id: 'INV-1224',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'S',
            name: 'Steve Hampton',
            email: 'steve.hamp@email.com',
        },
    },
    {
        id: 'INV-1223',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'C',
            name: 'Ciaran Murray',
            email: 'ciaran.murray@email.com',
        },
    },
    {
        id: 'INV-1221',
        date: 'Feb 3, 2023',
        status: 'Refunded',
        customer: {
            initial: 'M',
            name: 'Maria Macdonald',
            email: 'maria.mc@email.com',
        },
    },
    {
        id: 'INV-1220',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'C',
            name: 'Charles Fulton',
            email: 'fulton@email.com',
        },
    },
    {
        id: 'INV-1219',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'J',
            name: 'Jay Hooper',
            email: 'hooper@email.com',
        },
    },
    {
        id: 'INV-1218',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'K',
            name: 'Krystal Stevens',
            email: 'k.stevens@email.com',
        },
    },
    {
        id: 'INV-1217',
        date: 'Feb 3, 2023',
        status: 'Paid',
        customer: {
            initial: 'S',
            name: 'Sachin Flynn',
            email: 's.flyn@email.com',
        },
    },
    {
        id: 'INV-1216',
        date: 'Feb 3, 2023',
        status: 'Cancelled',
        customer: {
            initial: 'B',
            name: 'Bradley Rosales',
            email: 'brad123@email.com',
        },
    },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function OrderTable() {
    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const renderFilters = () => (
        <React.Fragment>
            <FormControl >
                <FormLabel>Status</FormLabel>
                <Select
                    placeholder="Filter by status"
                >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="refunded">Refunded</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <FormLabel>Category</FormLabel>
                <Select placeholder="All">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="refund">Refund</MenuItem>
                    <MenuItem value="purchase">Purchase</MenuItem>
                    <MenuItem value="debit">Debit</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <FormLabel>Customer</FormLabel>
                <Select placeholder="All">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="olivia">Olivia Rhye</MenuItem>
                    <MenuItem value="steve">Steve Hampton</MenuItem>
                    <MenuItem value="ciaran">Ciaran Murray</MenuItem>
                    <MenuItem value="marina">Marina Macdonald</MenuItem>
                    <MenuItem value="charles">Charles Fulton</MenuItem>
                    <MenuItem value="jay">Jay Hoper</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Paper
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    placeholder="Search"
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Dialog aria-labelledby="filter-modal" open={false}>
                        <IconButton />
                        <Typography id="filter-modal" >
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Paper>
                    </Dialog>
                </Modal>
            </Paper>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} >
                    <FormLabel>Search for order</FormLabel>
                    <Input placeholder="Search"  />
                </FormControl>
                {renderFilters()}
            </Box>
            <Paper
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '--TableCell-headBackground': 'var(--material-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--material-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                    <tr>
                        <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length !== rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={(event) => {
                                    setSelected(
                                        event.target.checked ? rows.map((row) => row.id) : [],
                                    );
                                }}
                                color={
                                    selected.length > 0 || selected.length === rows.length
                                        ? 'primary'
                                        : undefined
                                }
                                sx={{ verticalAlign: 'text-bottom' }}
                            />
                        </th>
                        <th style={{ width: 120, padding: '12px 6px' }}>
                            <Link
                                underline="none"
                                color="primary"
                                component="button"
                                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                sx={[
                                    {
                                        fontWeight: 'lg',
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    },
                                    order === 'desc'
                                        ? { '& svg': { transform: 'rotate(0deg)' } }
                                        : { '& svg': { transform: 'rotate(180deg)' } },
                                ]}
                            >
                                Invoice
                            </Link>
                        </th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
                        <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
                        <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
                        <th style={{ width: 140, padding: '12px 6px' }}> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...rows].sort(getComparator(order, 'id')).map((row) => (
                        <tr key={row.id}>
                            <td >
                                <Checkbox
                                    checked={selected.includes(row.id)}
                                    color={selected.includes(row.id) ? 'primary' : undefined}
                                    onChange={(event) => {
                                        setSelected((ids) =>
                                            event.target.checked
                                                ? ids.concat(row.id)
                                                : ids.filter((itemId) => itemId !== row.id),
                                        );
                                    }}
                                />
                            </td>
                            <td>
                                <Typography >{row.id}</Typography>
                            </td>
                            <td>
                                <Typography >{row.date}</Typography>
                            </td>
                            <td>
                                <Chip
                                >
                                    {/*{row.status}*/}
                                </Chip>
                            </td>
                            <td>
                                <Box >
                                    <Avatar >{row.customer.initial}</Avatar>
                                    <div>
                                        <Typography >{row.customer.name}</Typography>
                                        <Typography >{row.customer.email}</Typography>
                                    </div>
                                </Box>
                            </td>
                            <td>
                                <Box>
                                    <Link  >
                                        Download
                                    </Link>
                                </Box>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Paper>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />
                <Button
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}