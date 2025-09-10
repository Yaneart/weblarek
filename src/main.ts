import "./scss/styles.scss";
import { Cart } from "./components/base/Models/Cart";
import { Order } from "./components/base/Models/Order";
import { ProductList } from "./components/base/Models/ProductList";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/base/Api/LarekApi";
import { apiProducts } from "./utils/data";

const API_URL =
  import.meta.env.VITE_API_ORIGIN || "https://larek-api.nomoreparties.co";

const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const cart = new Cart();
const productList = new ProductList();
const order = new Order();

console.log("=== Тестирование моделей данных ===");

// Тестирование ProductList (каталог товаров)

productList.setProducts(apiProducts.items);
console.log(`Массив товаров из каталога:`, productList.getProducts());
console.log(
  "Получение товара по ID:",
  productList.getProduct("b06cde61-912f-4663-9751-09956c0eed67")
);
console.log("Количество товаров:", productList.getProducts().length);
console.log(
  "Поиск несуществующего товара:",
  productList.getProduct("321231231")
);
productList.setPreview("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
console.log("Превью товара:", productList.getPreview());
productList.setPreview("321231231");
console.log("Превью товара:", productList.getPreview());

// Тестирование Cart (корзина)
cart.addItem(apiProducts.items[2]);
cart.addItem(apiProducts.items[1]);
cart.addItem(apiProducts.items[0]);
console.log("Товары в корзине:", cart.items);
console.log("Общая стоимость:", cart.getTotalPrice());
console.log("Количество товаров:", cart.getTotalCount());
const product = productList.getProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
if (product) {
  if (!cart.checkProductInCart(product.id)) {
    cart.addItem(product);
    console.log("Товар добавлен в корзину");
  } else {
    console.log("Товар уже в корзине");
  }
}
console.log(
  "Проверка товара в корзине:",
  cart.checkProductInCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")
);
console.log(
  "Проверка товара в корзине:",
  cart.checkProductInCart("12312421123")
);
cart.removeItem(apiProducts.items[1].id);
console.log("Товары в корзине:", cart.items);
cart.clearCart();
console.log("Товары в корзине:", cart.items);

// Тестирование Order (покупатель)

const validOrderData = {
  payment: "card" as const,
  address: "Тестовый адрес",
  phone: "+79999999999",
  email: "test@test.com",
};
order.setOrderFields(validOrderData);
console.log("Данные заказа:", order.getOrderData());
console.log("Валидация заказа:", order.validateOrder());

const invalidOrderData = {
  payment: "cash" as const,
  address: "Тестовый адрес",
  phone: "",
  email: "123",
};
order.setOrderFields(invalidOrderData);
console.log("Данные заказа:", order.getOrderData());
console.log("Валидация заказа:", order.validateOrder());
order.clearOrder();
console.log("Данные заказа:", order.getOrderData());

console.log("=== Получение данных c сервера ===");

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
