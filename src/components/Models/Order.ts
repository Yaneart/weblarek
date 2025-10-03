import { IBuyer, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";

export class Order extends EventEmitter implements IBuyer {
  payment: TPayment;
  address: string;
  phone: string;
  email: string;

  constructor(
    address?: string,
    phone?: string,
    email?: string,
    payment: TPayment = "card"
  ) {
    super();
    this.payment = payment;
    this.address = address || "";
    this.phone = phone || "";
    this.email = email || "";
  }

  setPaymentMethod(payment: string): void {
    this.payment = payment as TPayment;
    this.emit("order:changed");
  }

  setAddress(address: string): void {
    this.address = address;
    this.emit("order:changed");
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.emit("order:changed");
  }

  setEmail(email: string): void {
    this.email = email;
    this.emit("order:changed");
  }

  getPaymentMethod(): string {
    return this.payment;
  }

  getAddress(): string {
    return this.address;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  setOrderFields(fields: Partial<IBuyer>) {
    if (fields.payment !== undefined) {
      this.payment = fields.payment;
    }
    if (fields.address !== undefined) {
      this.address = fields.address;
    }
    if (fields.phone !== undefined) {
      this.phone = fields.phone;
    }
    if (fields.email !== undefined) {
      this.email = fields.email;
    }
    this.emit("order:changed");
  }

  getOrderData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  clearOrder() {
    this.payment = "card";
    this.address = "";
    this.phone = "";
    this.email = "";
    this.emit("order:changed");
  }

  validateField(field: keyof IBuyer, value: string): string {
    switch (field) {
      case "email":
        return this.validateEmail(value);
      case "phone":
        return this.validatePhone(value);
      case "address":
        return this.validateAddress(value);
      case "payment":
        return this.validatePayment(value);
      default:
        return "";
    }
  }

  validateContacts(): {
    isValid: boolean;
    errors: { email: string; phone: string };
  } {
    const emailError = this.validateEmail(this.email);
    const phoneError = this.validatePhone(this.phone);

    return {
      isValid: !emailError && !phoneError,
      errors: { email: emailError, phone: phoneError },
    };
  }

  validateOrderForm(): {
    isValid: boolean;
    errors: { address: string; payment: string };
  } {
    const addressError = this.validateAddress(this.address);
    const paymentError = this.validatePayment(this.payment);

    return {
      isValid: !addressError && !paymentError,
      errors: { address: addressError, payment: paymentError },
    };
  }

  private validateEmail(email: string): string {
    if (!email) return "Email обязателен";
    if (!email.includes("@") || !email.includes("."))
      return "Введите корректный email";
    return "";
  }

  private validatePhone(phone: string): string {
    if (!phone) return "Телефон обязателен";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) return "Не менее 10 цифр";
    return "";
  }

  private validateAddress(address: string): string {
    if (!address) return "Адрес обязателен";
    return "";
  }

  private validatePayment(payment: string): string {
    if (!payment) return "Выберите способ оплаты";
    return "";
  }
}
