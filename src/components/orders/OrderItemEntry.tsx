import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore.ts";
import { useMemo } from "react";
import React from "react";
import {OrderItem} from "../../app/models/OrderItem.ts";

interface Props {
    item: OrderItem;
}

function OrderItemEntry({item}: Props) {
    const {filteredServices} = useAppSelector(state => state.services);

    const service = useMemo(() => {
        const found = filteredServices.find(s => s.id === item.serviceId);
        return found;
    }, [filteredServices, item.serviceId]);

    const total = useMemo(() => 
        (service?.pricePerUnit ?? 0) * item.quantity,
        [service?.pricePerUnit, item.quantity]
    );

    if (!service) {
        return null;
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
            <Typography flex={2}>{service.name}</Typography>
            <Typography>× {item.quantity}</Typography>
            <Typography flex={1} textAlign="center">
                {total} грн
            </Typography>
        </Box>
    );
}

export default React.memo(OrderItemEntry);