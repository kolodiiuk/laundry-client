import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
} from "@mui/material";
import BasketEntry from "./BasketEntry";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { calculateBasketTotal, getBasket, removeFromBasket, updateQuantity } from "../../app/store/slices/BasketSlice";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BasketDialog = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { basketItems, totalPrice } = useAppSelector(state => state.basket);
  const { filteredServices } = useAppSelector(state => state.services);

  // Calculate total when dialog opens or basket items change
  useEffect(() => {
    if (open && filteredServices.length > 0) {
      dispatch(calculateBasketTotal());
    }
  }, [open, basketItems, filteredServices, dispatch]);

  const handleQuantityChange = (basketItemId: number, newValue: number) => {
    if (newValue === 0) {
      dispatch(removeFromBasket(basketItemId));
    } else {
      dispatch(updateQuantity({ basketItemId, newValue }));
    }

    dispatch(calculateBasketTotal());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Корзина</DialogTitle>
      <DialogContent>
        <Box>
          {basketItems.map((item) => (
            <BasketEntry 
              key={item.id}
              item={item} 
              onQuantityChange={handleQuantityChange} 
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Всього: {totalPrice} грн</Typography>
          <Button variant="contained" color="secondary" onClick={onClose} href="/checkout">
            Оформити замовлення
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default BasketDialog;
