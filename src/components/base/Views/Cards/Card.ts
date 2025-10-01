import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { IProduct } from "../../../../types";
import { categoryMap } from "../../../../utils/constants";

export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._title = ensureElement<HTMLElement>(".card__title", container);
    this._image = ensureElement<HTMLImageElement>(".card__image", container);
    this._category = ensureElement<HTMLElement>(".card__category", container);
    this._price = ensureElement<HTMLElement>(".card__price", container);
  }

  set category(value: string) {
    this.setText(this._category, value);
    const categoryClass = categoryMap[value] || "other";
    this._category.className = `card__category card__category_${categoryClass}`;
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent || "");
  }

  set price(value: number | null) {
    this.setText(this._price, value ? `${value} синапсов` : "Бесценно");
  }
}
