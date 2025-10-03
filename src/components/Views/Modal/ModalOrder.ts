import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IOrderForm } from "../../../types";

interface IOrderActions {
  onPaymentChange: (payment: string) => void;
  onSubmit: (data: IOrderForm) => void;
  onInput: (field: string, value: string) => void;
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

    this._address.addEventListener("input", () => {
      actions?.onInput?.("address", this._address.value);
    });

    this._paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this._paymentButtons.forEach((btn) =>
          this.toggleClass(btn, "button_alt-active", false)
        );
        this.toggleClass(button, "button_alt-active", true);
        actions?.onPaymentChange?.(button.name);
      });
    });

    this._button.addEventListener("click", (event) => {
      event.preventDefault();
      actions?.onSubmit?.(this.getFormData());
    });
  }

  setErrors(errors: { address?: string; payment?: string }): void {
    this.setError(this._address, errors.address);
  }

  setFormState(valid: boolean): void {
    this.setDisabled(this._button, !valid);
    if (valid) this.clearErrors();
  }

  private setError(input: HTMLInputElement, error?: string): void {
    this.clearError(input);
    if (error) {
      input.classList.add("error");
      const errorEl = document.createElement("div");
      errorEl.className = "error-message";
      errorEl.style.cssText = "color:red";
      errorEl.textContent = error;
      input.parentNode?.appendChild(errorEl);
    }
  }

  private clearError(input: HTMLInputElement): void {
    input.classList.remove("error");
    input.parentNode?.querySelector(".error-message")?.remove();
  }

  private clearErrors(): void {
    this.clearError(this._address);
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
