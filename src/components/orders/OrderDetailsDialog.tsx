import { Dialog, DialogTitle, DialogContent, Box, Typography, Button, Stack } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import BasketItemEntryCheckout from "../basket/BasketItemEntryCheckout";
import { Order } from "../../app/models/Order";
import { Role } from "../../app/models/User";
import agent from "../../app/api/agent";

interface Props {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsDialog({ order, open, onClose }: Props) {
  const { orderItems } = useAppSelector(state => state.orders);
  const {user} = useAppSelector(s => s.auth);
  const orderItemsOfCurrOrder = orderItems.filter(oi => oi.orderId === order?.id);

  const handleGetCheque = async () => {
    if (!order) return;
    try {
      const response = await agent.Reports.cheque(order.id);
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `cheque-${order.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download cheque:", error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Stack flexDirection={"row"}>
      <DialogTitle>
        Замовлення №{order?.id}
      </DialogTitle>          
        {user?.role === Role.Customer && (
            <Button onClick={handleGetCheque} variant={'outlined'}>
              Чек
            </Button>
          )}
          </Stack>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Деталі замовлення</Typography>
          {orderItemsOfCurrOrder.map(item => (
            <BasketItemEntryCheckout key={item.id} item={item} />
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography>Всього: {order?.subtotal} грн</Typography>
          <Typography>Доставка: {order?.deliveryFee} грн</Typography>
          {order?.hasCoupon && (
            <Typography>Знижка: {order?.discount} грн</Typography>
          )}
          <Typography variant="h6">
            Всього: {order?.subtotal + order?.deliveryFee - (order?.discount || 0)} грн
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
