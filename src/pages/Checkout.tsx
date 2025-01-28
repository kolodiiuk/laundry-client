import { Box, Button, MenuItem, Select, TextField, Typography, CircularProgress } from "@mui/material";
import { AppDispatch, useAppSelector } from "../app/store/configureStore";
import OrderItemEntry from "../components/basket/BasketItemEntryCheckout.tsx";
import { useEffect, useMemo, useState } from "react";
import { Address } from "../app/models/Address";
import { useDispatch } from "react-redux";
import { getBasket } from "../app/store/slices/BasketSlice";
import { fetchAllAvailableServices } from "../app/store/slices/ServiceSlice";
import { createOrder } from "../app/store/slices/OrdersSlice";
import { useNavigate } from "react-router-dom";
import { clearBasket } from "../app/store/slices/BasketSlice";
import { CreateOrderDto, PaymentMethod } from "../app/models/Order";
import { fetchUserAddresses } from "../app/store/slices/AuthSlice";

const DELIVERY_FEE = 50;

export default function Checkout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState<number>(0);
    const [description, setDescription] = useState('');
    
    const { basketItems, loading, error } = useAppSelector(state => state.basket);
    const { user, addresses } = useAppSelector(state => state.auth);
    const { filteredServices } = useAppSelector(state => state.services);

    const formatAddress = (address: Address) => {
        return `${address.city}, ${address.district}, ${address.street}, ${address.house}, кв. ${address.apartments}`;
    };

    const subtotal = useMemo(() => 
        basketItems.reduce((sum, item) => {
            const service = filteredServices.find(s => s.id === item.serviceId);
            return sum + (service?.pricePerUnit ?? 0) * item.quantity;
        }, 0),
        [basketItems, filteredServices]
    );

    useEffect(() => {
        if (user?.id) {
            dispatch(getBasket(user.id));
            dispatch(fetchAllAvailableServices());
            dispatch(fetchUserAddresses())
        }
    }, [dispatch, user?.id]);

    if (loading || !filteredServices.length) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );

    const total = subtotal + DELIVERY_FEE;

    const handleSubmit = async () => {
        if (!user || !selectedAddress) return;

        const orderItems = basketItems.map(item => ({
            serviceId: item.serviceId,
            quantity: item.quantity
        }));

        const orderDto: CreateOrderDto = {
            userId: user.id,
            addressId: selectedAddress,
            description: description || '',
            paymentMethod: PaymentMethod.Cash,
            deliveryFee: DELIVERY_FEE,
            hasCoupon: false,
            orderItems
        };

        try {
            await dispatch(createOrder(orderDto));
            dispatch(clearBasket());
            navigate('/profile/orders');
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography color="error">{error}</Typography>
        </Box>
    );

    if (basketItems.length === 0) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography>Ваш кошик порожній</Typography>
        </Box>
    );

    return (
        <Box sx={{
            minWidth: '100vw', 
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'background.paper',
            py: 4
        }}>
            <Box sx={{ 
                maxWidth: 800,
                margin: '0 auto',
                padding: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1
            }}>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
                    Оформлення замовлення
                </Typography>
                
                <Box sx={{ 
                    mb: 4,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    p: 2
                }}>
                    {basketItems.map((item) => (
                        <OrderItemEntry key={item.id} item={item} />
                    ))}
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Додаткові примітки до замовлення"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Typography>
                    Обрати адресу доставки
                </Typography>
                <Select
                    fullWidth
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(Number(e.target.value))}
                    sx={{ mb: 3 }}
                >
                    {addresses.map((address) => (
                        <MenuItem key={address.id} value={address.id}>
                            {formatAddress(address)}
                        </MenuItem>
                    ))}
                    
                </Select>

                <Box sx={{ 
                    mb: 3,
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1
                }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Вартість послуг: {subtotal} грн
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Доставка: {DELIVERY_FEE} грн
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Загалом: {total} грн
                    </Typography>
                </Box>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    size="large"
                    onClick={handleSubmit}
                    disabled={!selectedAddress}
                    sx={{ py: 1.5 }}
                >
                    Підтвердити замовлення
                </Button>
            </Box>
        </Box>
    );
}
