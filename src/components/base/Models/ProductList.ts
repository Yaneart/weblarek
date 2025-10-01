import { IProduct } from "../../../types/index";
import { EventEmitter } from "../Events";

export class ProductList extends EventEmitter {
  items: IProduct[];
  preview: string | null;

  constructor() {
    super();
    this.items = [];
    this.preview = null;
  }

  setProducts(items: IProduct[]): void {
    this.items = [...items];
    this.emit("products:changed");
  }

  getProducts(): IProduct[] {
    return [...this.items];
  }

  getProduct(id: string): IProduct | null {
    return this.items.find((item) => item.id === id) || null;
  }

  setPreview(productId: string) {
    const product = this.getProduct(productId);

    if (product) {
      this.preview = productId;
    } else {
      this.preview = null;
    }
  }

  getPreview(): IProduct | null {
    if (!this.preview) {
      return null;
    }
    return this.getProduct(this.preview);
  }
}
