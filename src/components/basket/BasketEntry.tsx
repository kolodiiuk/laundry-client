  import { Box, Typography, IconButton, TextField } from "@mui/material";
  import { Add, Remove } from "@mui/icons-material";
  import { BasketItem } from "../../app/models/BasketItem";
  import { useAppSelector } from "../../app/store/configureStore";
  import { useMemo } from "react";

  interface Props {
    item: BasketItem;
    onQuantityChange: Function;
  }

  const BasketEntry = ({ item, onQuantityChange } : Props) => {

    // const dispatch = useAppDispatch();
    const {filteredServices} = useAppSelector(state => state.services);

    const service = useMemo(() => 
      filteredServices.find(s => s.id === item.serviceId),
      [filteredServices, item.serviceId]
    );

    const price = useMemo(() => 
      service?.pricePerUnit ?? 0,
      [service, item.quantity]
    );

    const handleIncrease = () => {
      onQuantityChange(item.id, item.quantity + 1);
    };

    const handleDecrease = () => {
      onQuantityChange(item.id, item.quantity - 1);
    };

    return (
      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
        <Typography flex={2}>{service?.name ?? ''}</Typography>
        <Box display="flex" alignItems="center" flex={1} justifyContent="center">
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          {/* <Typography>{item.quantity}</Typography> */}
          <TextField
            value={item.quantity}
            inputProps={{
              style: { textAlign: "center" },
              readOnly: true,
            }}
            sx={{ width: 50 }}
          />
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Box>
        <Typography flex={1} textAlign="center">
        {price} грн
        </Typography>
      </Box>
    );
  };

  export default BasketEntry;
