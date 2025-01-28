import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { useMemo } from "react";
import React from "react";

interface ItemProps {
  serviceId: number;
  quantity: number;
}

interface Props {
  item: ItemProps;
}

function BasketItemEntryCheckout({ item }: Props) {
  const { filteredServices } = useAppSelector(state => state.services);

  const service = useMemo(() => {
    console.log("Finding service for:", item.serviceId, "Available services:", filteredServices);
    return filteredServices.find(s => s.id === item.serviceId);
  }, [filteredServices, item.serviceId]);

  const total = useMemo(() => 
    (service?.pricePerUnit ?? 0) * item.quantity,
    [service?.pricePerUnit, item.quantity]
  );

  if (!service) {
    console.log("Service not found for item:", item);
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

export default React.memo(BasketItemEntryCheckout);