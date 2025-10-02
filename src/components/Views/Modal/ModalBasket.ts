import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

interface IBasketActions {
  onClick: (event: MouseEvent) => void;
}

export class ModalBasket extends Component<{
  total: number;
  buttonDisabled: boolean;
}> {
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _list: HTMLElement;

  constructor(container: HTMLElement, actions?: IBasketActions) {
    super(container);
    this._total = ensureElement<HTMLElement>(".basket__price", container);
    this._button = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container
    );
    this._list = ensureElement<HTMLElement>(".basket__list", container);

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
  }

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this._button, value);
  }
}
