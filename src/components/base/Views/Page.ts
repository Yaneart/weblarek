import { Component } from "../Component";
import { ensureElement } from "../../../utils/utils";

interface IPageData {
  counter: number;
}

interface IPageActions {
  onBasketClick: (event: MouseEvent) => void;
}

export class Page extends Component<IPageData> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, actions?: IPageActions) {
    super(container);
    this._counter = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this._catalog = ensureElement<HTMLElement>(".gallery", this.container);
    this._wrapper = ensureElement<HTMLElement>(
      ".page__wrapper",
      this.container
    );
    this._basket = ensureElement<HTMLElement>(
      ".header__basket",
      this.container
    );

    if (actions?.onBasketClick) {
      this._basket.addEventListener("click", actions.onBasketClick);
    }
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this.toggleClass(this._wrapper, "page__wrapper_locked", value);
  }
}
