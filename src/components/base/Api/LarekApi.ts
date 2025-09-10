import { IApi, IProduct, IOrderData, OrderResult } from "../../../types/index";

export class LarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProductList(): Promise<IProduct[]> {
    try {
      const response = (await this.api.get("/api/weblarek/product/")) as {
        // пытался пытался так и не понял как мне тут просто /product/ поставить, работает только так :(
        items: IProduct[];
      };
      return response.items;
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
      throw error;
    }
  }

  async submitOrder(orderData: IOrderData): Promise<OrderResult> {
    try {
      const response = (await this.api.post("/order/", orderData)) as {
        id: string;
        total: number;
      };
      return {
        id: response.id,
        total: response.total,
      };
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      throw error;
    }
  }
}
