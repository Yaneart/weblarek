import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { ICardBasketData } from "../../../types";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardBasket extends Component<ICardBasketData> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._index = ensureElement<HTMLElement>(".basket__item-index", container);
    this._title = ensureElement<HTMLElement>(".card__title", container);
    this._price = ensureElement<HTMLElement>(".card__price", container);
    this._button = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      container
    );

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set index(value: number) {
    this.setText(this._index, value.toString());
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: number | null) {
    this.setText(this._price, value ? `${value} синапсов` : "Бесценно");
  }
}
