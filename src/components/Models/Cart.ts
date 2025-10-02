import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Cart extends EventEmitter {
  items: IProduct[];

  constructor() {
    super();
    this.items = [];
  }

  addItem(item: IProduct) {
    this.items.push(item);
    this.emit("cart:changed");
    return true;
  }

  removeItem(id: string) {
    this.items = this.items.filter((items) => items.id !== id);
    this.emit("cart:changed");
  }

  clearCart() {
    this.items = [];
    this.emit("cart:changed");
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

  getItems(): IProduct[] {
    return this.items;
  }

  getTotal(): number {
    return this.getTotalPrice();
  }

  clear(): void {
    this.clearCart();
  }
}
