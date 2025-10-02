import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IContactsForm } from "../../../types";

interface IContactsActions {
  onSubmit: (data: IContactsForm) => void;
}

export class ModalContacts extends Component<IContactsForm> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IContactsActions) {
    super(container);
    this._email = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      container
    );
    this._phone = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      container
    );
    this._button = ensureElement<HTMLButtonElement>(".button", container);

    this._email.addEventListener("input", this.validateForm.bind(this));
    this._phone.addEventListener("input", this.validateForm.bind(this));

    this._button.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = {
        email: this._email.value.trim(),
        phone: this._phone.value.trim(),
      };

      actions?.onSubmit?.(formData);
    });

    this.setDisabled(this._button, true);
  }

  private validateForm = (): void => {
    const email = this._email.value.trim();
    const phone = this._phone.value.trim();

    const isEmailValid = email.includes("@") && email.includes(".");
    const isPhoneValid = phone.replace(/\D/g, "").length >= 10;

    const emailError = !isEmailValid && email ? "Введите корректный email" : "";
    const phoneError = !isPhoneValid && phone ? "Не менее 10 цифр" : "";

    this.setDisabled(this._button, !(isEmailValid && isPhoneValid));

    this.showError(this._email, emailError);
    this.showError(this._phone, phoneError);
  };

  private showError(input: HTMLInputElement, error: string): void {
    const existing = input.parentNode?.querySelector(".error-message");
    existing?.remove();

    input.classList.toggle("error", !!error);

    if (error && input.parentNode) {
      const errorEl = document.createElement("div");
      errorEl.className = "error-message";
      errorEl.style.cssText = "color:red;text-size:12px";
      errorEl.textContent = error;
      input.parentNode.appendChild(errorEl);
    }
  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this._button, value);
  }
}
