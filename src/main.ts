import "./scss/styles.scss";
import { Cart } from "./components/Models/Cart";
import { Order } from "./components/Models/Order";
import { ProductList } from "./components/Models/ProductList";
import { Api } from "./components/base/Api";
import { LarekApi } from "./components/Api/LarekApi";
import { ensureElement, cloneTemplate } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { TPayment, IOrderData } from "./types";
import { Page } from "./components/Views/Page";
import { CardCatalog } from "./components/Views/Cards/CardCatalog";
import { CardPreview } from "./components/Views/Cards/CardPreview";
import { CardBasket } from "./components/Views/Cards/CardBasket";
import { Modal } from "./components/Views/Modal/Modal";
import { ModalBasket } from "./components/Views/Modal/ModalBasket";
import { ModalOrder } from "./components/Views/Modal/ModalOrder";
import { ModalContacts } from "./components/Views/Modal/ModalContacts";
import { ModalSuccess } from "./components/Views/Modal/ModalSuccess";
import { CDN_URL } from "./utils/constants";
import { Header } from "./components/Views/Header";

const API_URL =
  import.meta.env.VITE_API_ORIGIN || "https://larek-api.nomoreparties.co";

const events = new EventEmitter();
const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const cart = new Cart();
const productList = new ProductList();
const order = new Order();
const header = new Header(events, ensureElement<HTMLElement>(".header"));

const page = new Page(ensureElement<HTMLElement>(".page"));

const modal = new Modal(events, ensureElement<HTMLElement>("#modal-container"));

const modalBasket = new ModalBasket(cloneTemplate("#basket"), {
  onClick: () => events.emit("order:open"),
});

const modalOrder = new ModalOrder(cloneTemplate("#order"), {
  onPaymentChange: (payment: string) =>
    events.emit("order.payment:change", { payment }),
  onSubmit: (data: any) => events.emit("order:submit", data),
});

const modalContacts = new ModalContacts(cloneTemplate("#contacts"), {
  onSubmit: (data: any) => events.emit("contacts:submit", data),
});

const modalSuccess = new ModalSuccess(cloneTemplate("#success"), {
  onClick: () => events.emit("success:close"),
});

productList.on("products:changed", () => renderCatalog());
cart.on("cart:changed", () => renderBasket());

events.on("card:select", (data: { id: string }) => {
  const product = productList.getProduct(data.id);
  if (product) {
    openProductPreview(product);
  }
});

events.on("card:add", (data: { id: string }) => {
  const product = productList.getProduct(data.id);
  if (product) {
    cart.addItem(product);
    events.emit("modal:close");
  }
});

events.on("basket:remove", (data: { id: string }) => {
  cart.removeItem(data.id);
});

events.on("basket:open", () => {
  modal.contents = modalBasket.render();
  modal.open = true;
});

events.on("order:open", () => {
  if (cart.getItems().length > 0) {
    modal.contents = modalOrder.render();
    modal.open = true;
  }
});

events.on("order.payment:change", (data: { payment: string }) => {
  order.setPaymentMethod(data.payment);
  validateOrderForm();
});

events.on("order:submit", (data: any) => {
  console.log("Форма заказа отправлена:", data);
  order.setAddress(data.address);

  if (order.validateOrder()) {
    modal.contents = modalContacts.render();
    modal.open = true;
  } else {
    console.log("Заказ не прошел валидацию");
  }
});

events.on("contacts:submit", async (data: any) => {
  console.log("Форма отправлена:", data);

  order.setEmail(data.email);
  order.setPhone(data.phone);

  if (order.validateContacts()) {
    try {
      const paymentMethod = order.getPaymentMethod() as TPayment;

      const orderData: IOrderData = {
        items: cart.getItems().map((item) => item.id),
        total: cart.getTotalPrice(),
        address: order.getAddress(),
        payment: paymentMethod,
        email: order.getEmail(),
        phone: order.getPhone(),
      };

      console.log("Отправка заказа API:", orderData);

      const result = await larekApi.submitOrder(orderData);
      console.log("Заказ отправлен:", result);

      modalSuccess.total = cart.getTotalPrice();
      modal.contents = modalSuccess.render();
      modal.open = true;

      cart.clearCart();
      order.clearOrder();
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  } else {
    console.log("Заказ не прошел валидацию");
  }
});

events.on("modal:close", () => {
  modal.open = false;
});

events.on("success:close", () => {
  modal.open = false;
});

events.on("modal:open", () => {
  page.locked = true;
});

events.on("modal:close", () => {
  page.locked = false;
});

events.on("cart:changed", () => {
  // Если модальное окно открыто и показывает превью товара
  if (modal.open && modal.contents?.classList.contains("card")) {
    const productId = modal.contents
      .querySelector(".card")
      ?.getAttribute("data-id");
    if (productId) {
      const product = productList.getProduct(productId);
      if (product) {
        openProductPreview(product); // Перерисовываем превью с обновленным состоянием кнопки
      }
    }
  }
});

function renderCatalog(): void {
  const products = productList.getProducts();
  console.log("Рендеринг каталога:", products);

  const catalogItems = products.map((product) => {
    const cardElement = cloneTemplate("#card-catalog");
    const card = new CardCatalog(cardElement, {
      onClick: () => events.emit("card:select", { id: product.id }),
    });

    const isInCart = cart.checkProductInCart(product.id);

    return card.render({
      id: product.id,
      title: product.title,
      image: `${CDN_URL}${product.image}`,
      category: product.category,
      price: product.price,
      description: product.description,
      buttonText: isInCart ? "В корзине" : "В корзину",
      buttonDisabled: isInCart,
    });
  });

  page.catalog = catalogItems;
}

function renderBasket(): void {
  const items = cart.getItems();
  console.log("Рендеринг корзины:", items);

  header.counter = items.length;

  modalBasket.total = cart.getTotalPrice();
  modalBasket.buttonDisabled = items.length === 0;

  const basketItems = items.map((item, index) => {
    const cardElement = cloneTemplate("#card-basket");
    const card = new CardBasket(cardElement, {
      onClick: () => events.emit("basket:remove", { id: item.id }),
    });

    return card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });

  modalBasket.list = basketItems;
}

function openProductPreview(product: any): void {
  const cardElement = cloneTemplate("#card-preview");
  const isInCart = cart.checkProductInCart(product.id);

  const card = new CardPreview(cardElement, {
    onClick: () => {
      if (isInCart) {
        events.emit("basket:remove", { id: product.id });
        events.emit("modal:close");
      } else {
        events.emit("card:add", { id: product.id });
      }
    },
  });

  const renderedCard = card.render({
    id: product.id,
    title: product.title,
    image: `${CDN_URL}${product.image}`,
    category: product.category,
    price: product.price,
    description: product.description,
    buttonText: isInCart ? "Удалить из корзины" : "В корзину",
  });

  modal.contents = renderedCard;
  modal.open = true;
}

function validateOrderForm(): void {
  const isOrderValid =
    order.getAddress().length > 0 && order.getPaymentMethod().length > 0;
  modalOrder.buttonDisabled = !isOrderValid;
}

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
