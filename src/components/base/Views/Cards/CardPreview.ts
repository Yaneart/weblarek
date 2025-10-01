import { Card } from "./Card";
import { ensureElement } from "../../../../utils/utils";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardPreview extends Card {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._description = ensureElement<HTMLElement>(".card__text", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    if (actions?.onClick) {
      this._button.addEventListener("click", actions.onClick);
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}
