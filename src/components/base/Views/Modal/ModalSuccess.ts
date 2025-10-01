import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { ISuccess } from "../../../../types";

interface ISuccessActions {
  onClick: (event: MouseEvent) => void;
}

export class ModalSuccess extends Component<ISuccess> {
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ISuccessActions) {
    super(container);
    this._total = ensureElement<HTMLElement>(
      ".order-success__description",
      container
    );
    this._button = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      container
    );

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }
}
