export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description?: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface ICardCatalogData extends IProduct {
  buttonText: string;
  buttonDisabled: boolean;
}

export interface ICardBasketData extends IProduct {
  index: number;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = "card" | "cash";

export interface IOrderData {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface OrderResult {
  id: string;
  total: number;
}

export interface IOrderForm {
  address: string;
  payment: string;
}

export interface IContactsForm {
  email: string;
  phone: string;
}

export interface ISuccess {
  total: number;
}

export interface IBasket {
  items: IProduct[];
  total: number;
}
