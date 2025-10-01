import { ensureElement } from "../../../../utils/utils";
import { Component } from "../../Component";
import { IEvents } from "../../Events";

interface IModal {
  contents: HTMLElement;
  open: boolean;
}

export class Modal extends Component<IModal> {
  protected content: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.content = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.events.emit("modal:close");
      }
    });

    this.closeButton.addEventListener("click", () => {
      this.events.emit("modal:close");
    });
  }

  set contents(content: HTMLElement) {
    this.content.replaceChildren(content);
  }

  set open(value: boolean) {
    if (value) {
      this.container.classList.add("modal_active");
      document.body.style.overflow = "hidden";
    } else {
      this.container.classList.remove("modal_active");
      document.body.style.overflow = "";
    }
  }
}
