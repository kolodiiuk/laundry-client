import {type FunctionComponent} from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore.ts";
import { addToBasket, calculateBasketTotal, updateQuantity } from "../../../app/store/slices/BasketSlice.ts";
import { CustomCellRendererProps } from "ag-grid-react";

export const AddToBasketCellRenderer: FunctionComponent<CustomCellRendererProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const basketItems = useAppSelector(state => state.basket.basketItems);

  const handleAddToBasket = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) return;

    const existingItem = basketItems.find(item => item.serviceId === data.id);  

    console.log(existingItem);
    
    if (existingItem) {
      dispatch(updateQuantity({ 
        basketItemId: existingItem.id, 
        newValue: existingItem.quantity + 1 
      }));
    } else {
      dispatch(addToBasket({
        serviceId: data.id,
        userId: user.id,
        quantity: 1,
      }));
    }
    dispatch(calculateBasketTotal());
  };

  return (
    <Button
      sx={{
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
        border: 'none'
      }}
      onClick={handleAddToBasket}
    >
      +
    </Button>
  );
};
