import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { IContactsForm } from "../../../../types";

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

    const validateForm = () => {
      const email = this._email.value.trim();
      const phone = this._phone.value.trim();

      const isEmailValid = email.includes("@") && email.includes(".");
      const isPhoneValid = phone.replace(/\D/g, "").length >= 10;

      const isValid = isEmailValid && isPhoneValid;
      this.setDisabled(this._button, !isValid);
    };

    this._email.addEventListener("input", validateForm);
    this._phone.addEventListener("input", validateForm);

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
