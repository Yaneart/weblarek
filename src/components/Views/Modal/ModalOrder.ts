import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IOrderForm } from "../../../types";

interface IOrderActions {
  onPaymentChange: (payment: string) => void;
  onSubmit: (data: IOrderForm) => void;
}

export class ModalOrder extends Component<IOrderForm> {
  protected _address: HTMLInputElement;
  protected _paymentButtons: HTMLButtonElement[];
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IOrderActions) {
    super(container);
    this._address = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      container
    );
    this._paymentButtons = Array.from(
      container.querySelectorAll(".button_alt")
    );
    this._button = ensureElement<HTMLButtonElement>(
      ".order__button",
      container
    );

    const checkValidity = () => {
      const hasAddress = this._address.value.trim().length > 0;
      const hasPayment = this._paymentButtons.some((btn) =>
        btn.classList.contains("button_alt-active")
      );
      this.setDisabled(this._button, !(hasAddress && hasPayment));
    };

    this._paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this._paymentButtons.forEach((btn) =>
          this.toggleClass(btn, "button_alt-active", false)
        );
        this.toggleClass(button, "button_alt-active", true);
        actions?.onPaymentChange?.(button.name);
        checkValidity();
      });
    });

    this._address.addEventListener("input", checkValidity);

    this._button.addEventListener("click", (event) => {
      event.preventDefault();
      actions?.onSubmit?.(this.getFormData());
    });
  }

  set address(value: string) {
    this._address.value = value;
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this._button, value);
  }

  private getFormData(): IOrderForm {
    const activePayment = this._paymentButtons.find((btn) =>
      btn.classList.contains("button_alt-active")
    );
    return {
      address: this._address.value,
      payment: activePayment?.name || "",
    };
  }
}
