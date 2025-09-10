import "./scss/styles.scss";
import { Cart } from "./components/base/Models/Cart";
import { Order } from "./components/base/Models/Order";
import { ProductList } from "./components/base/Models/ProductList";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/base/Api/LarekApi";
import { IProduct } from "./types/index";

const API_URL =
  import.meta.env.VITE_API_ORIGIN || "https://larek-api.nomoreparties.co";

const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const cart = new Cart();
const productList = new ProductList();
const order = new Order();

console.log("=== Тестирование моделей данных ===");

// Тестирование ProductList (каталог товаров)
const testProduct: IProduct = {
  id: "test-1",
  description: "Тестовый товар",
  image: "test.jpg",
  title: "Тестовый товар",
  category: "тест",
  price: 1000,
};

productList.setProducts([testProduct]);
console.log("Товары в каталоге:", productList.getProducts());
console.log("Получение товара по ID:", productList.getProduct("test-1"));

// Тестирование Cart (корзина)
cart.addItem(testProduct);
console.log("Товары в корзине:", cart.items);
console.log("Общая стоимость:", cart.getTotalPrice());
console.log("Количество товаров:", cart.getTotalCount());
console.log("Проверка товара в корзине:", cart.checkProductInCart("test-1"));

// Тестирование Order (покупатель)
order.setOrderFields({
  payment: "card",
  address: "Тестовый адрес",
  phone: "+79999999999",
  email: "test@test.com",
});
console.log("Данные заказа:", order.getOrderData());
console.log("Валидация заказа:", order.validateOrder());

console.log("=== Получение данных с сервера ===");

async function loadProducts() {
  try {
    const products = await larekApi.getProductList();
    console.log("Товары с сервера:", products);

    productList.setProducts(products);
    console.log("Товары сохранены в модель:", productList.getProducts());
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
  }
}

loadProducts();
