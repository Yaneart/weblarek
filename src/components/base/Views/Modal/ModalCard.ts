import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";

export class ModalCard extends Component<{ title: string }> {
  protected _title: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._title = ensureElement<HTMLElement>(".card__title", container);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }
}
