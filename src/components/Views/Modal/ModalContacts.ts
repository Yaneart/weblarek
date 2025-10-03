import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IContactsForm } from "../../../types";

interface IContactsActions {
  onSubmit: (data: IContactsForm) => void;
  onInput: (field: string, value: string) => void;
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

    this._email.addEventListener("input", () =>
      actions?.onInput?.("email", this._email.value)
    );
    this._phone.addEventListener("input", () =>
      actions?.onInput?.("phone", this._phone.value)
    );

    this._button.addEventListener("click", (event) => {
      event.preventDefault();
      actions?.onSubmit?.({
        email: this._email.value,
        phone: this._phone.value,
      });
    });
  }

  setErrors(errors: { email?: string; phone?: string }): void {
    this.setError(this._email, errors.email);
    this.setError(this._phone, errors.phone);
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
    this.clearError(this._email);
    this.clearError(this._phone);
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
