import { IProduct } from "../../../types/index";

export class Cart {
  items: IProduct[];

  constructor() {
    this.items = [];
  }

  addItem(item: IProduct) {
    const existingItems = this.items.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItems) {
      console.log(`Товар "${item.title}" уже есть в корзине`);
      return;
    }
    this.items.push(item);
    console.log(`Товар "${item.title}" добавлен в корзину`);
  }
  removeItem(id: string) {
    this.items = this.items.filter((items) => items.id !== id);
  }
  clearCart() {
    this.items = [];
  }
  getTotalPrice() {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }
  getTotalCount() {
    return this.items.length;
  }
  checkProductInCart(id: string) {
    return this.items.some((item) => item.id === id);
  }
}
