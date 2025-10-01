import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { IEvents } from "../Events";
import { IBasket } from "../../../types";

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);

    this._list = ensureElement<HTMLElement>(".basket__list", container);
    this._total = ensureElement<HTMLElement>(".basket__price", container);
    this._button = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container
    );

    this._button.addEventListener("click", () => {
      events.emit("order:open");
    });

    events.on("basket:change", () => {
      this.checkButtonState();
    });
  }

  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this.checkButtonState();
  }

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }

  private checkButtonState(): void {
    const isEmpty = this._list.children.length === 0;
    this.setDisabled(this._button, isEmpty);
  }
}
