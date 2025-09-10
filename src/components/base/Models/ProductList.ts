import { IProduct } from "../../../types/index";

export class ProductList {
  items: IProduct[];
  preview: string | null;

  constructor() {
    this.items = [];
    this.preview = null;
  }

  setProducts(items: IProduct[]): void {
    this.items = [...items];
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
