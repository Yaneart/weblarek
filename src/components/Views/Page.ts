import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IPageData {
  counter: number;
}

export class Page extends Component<IPageData> {
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._catalog = ensureElement<HTMLElement>(".gallery", this.container);
    this._wrapper = ensureElement<HTMLElement>(
      ".page__wrapper",
      this.container
    );
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this.toggleClass(this._wrapper, "page__wrapper_locked", value);
  }
}
