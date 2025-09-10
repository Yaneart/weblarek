import { IBuyer, TPayment } from "../../../types/index";

export class Order implements IBuyer {
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
    this.payment = payment;
    this.address = address || "";
    this.phone = phone || "";
    this.email = email || "";
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
  }

  setPayment(payment: TPayment) {
    this.payment = payment;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setEmail(email: string) {
    this.email = email;
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
  }
  validateOrder() {
    if (!this.payment || (this.payment !== "cash" && this.payment !== "card")) {
      return false;
    }
    if (!this.address || this.address.length === 0) {
      return false;
    }
    const phoneRegex =
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/;
    if (
      !this.phone ||
      this.phone.length === 0 ||
      !phoneRegex.test(this.phone)
    ) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      return false;
    }
    return true;
  }
}
