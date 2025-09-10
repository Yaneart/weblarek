import { IProduct } from "../../../types/index";

export class Cart {
  items: IProduct[];

  constructor() {
    this.items = [];
  }

  addItem(item: IProduct) {
    this.items.push(item);
    return true;
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
