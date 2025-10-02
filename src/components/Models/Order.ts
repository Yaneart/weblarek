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

  validateContacts(): boolean {
    const emailValid = this.email.includes("@") && this.email.includes(".");

    const digitsOnly = this.phone.replace(/\D/g, "");
    const phoneValid = digitsOnly.length >= 11;
    return emailValid && phoneValid;
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

  validateOrder() {
    if (!this.payment || (this.payment !== "cash" && this.payment !== "card")) {
      return false;
    }
    if (!this.address || this.address.length === 0) {
      return false;
    }
    return true;
  }
}
