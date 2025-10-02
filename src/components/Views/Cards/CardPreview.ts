import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

interface ICardPreviewData extends IProduct {
  buttonText?: string;
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

  set buttonText(value: string) {
    this.setText(this._button, value);
  }

  set description(value: string | undefined) {
    this.setText(this._description, value || "");
  }

  render(data: ICardPreviewData): HTMLElement {
    super.render(data);

    this.description = data.description;

    if (data.buttonText) {
      this.buttonText = data.buttonText;
    }

    return this.container;
  }
}
