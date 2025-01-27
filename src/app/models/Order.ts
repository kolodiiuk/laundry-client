export interface Order {
  id: number;
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
  createdAt: Date;
}

export enum OrderStatus {
  Created,
  Approved,
  Collected,
  Delivered,
}

export enum PaymentMethod {
  Cash,
  CreditCard,
}

export enum PaymentStatus {
  NotPaid,
  Paid,
}

export interface CreateOrderDto {
    userId: number;
    addressId: number;
    description: string;
    paymentMethod: PaymentMethod;
    deliveryFee: number;
    hasCoupon: boolean;
    couponId?: number;
    orderItems: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
    serviceId: number;
    quantity: number;
}