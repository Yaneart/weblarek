import { Card } from "./Card";
import { ICardCatalogData } from "../../../../types";

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardCatalog extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      container.addEventListener("click", actions.onClick);
    }
  }

  render(data?: Partial<ICardCatalogData>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
