export interface Order {

  status: OrderStatus;
  subtotal: number;
  description: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  hasCoupon: boolean;
  discount: number;
  deliveryFee: number;
  paymentIntentId: string;
  couponId: number;
  collectedDate: Date;
  deliveredDate: Date;
  userId: number;
  addressId: number;
  created: Date;
}

//todo: add order status
export enum OrderStatus {

}

export enum PaymentMethod {

  Cash,
  CreditCard,
}

export enum PaymentStatus {

  NotPaid,
  Paid,
}