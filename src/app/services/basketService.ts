import { BasketItem, CreateBasketItemDto, UpdateQuantityDto } from "../models/BasketItem";
import agent from "../api/agent";

export class BasketService {
  static async getBasket(userId: number): Promise<BasketItem[]> {
    return await agent.Basket.get(userId);
  }

  static async addItem(createDto: CreateBasketItemDto): Promise<BasketItem> {
    return await agent.Basket.create(createDto);
  }

  static async updateQuantity(updateDto: UpdateQuantityDto): Promise<BasketItem> {
    return await agent.Basket.updateQuantity(updateDto);
  }

  static async removeItem(basketItemId: number): Promise<void> {
    return await agent.Basket.delete(basketItemId);
  }
}
