export interface BasketItem {
  id: number;
  serviceId: number;
  userId: number;
  quantity: number;
}

export interface CreateBasketItemDto {
  serviceId: number;
  userId: number;
  quantity: number;
}

export interface UpdateQuantityDto {
  basketItemId: number;
  newValue: number;
}