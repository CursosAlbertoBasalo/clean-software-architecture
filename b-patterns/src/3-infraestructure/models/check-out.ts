export interface CheckOut {
  paymentMethod : string;
  paymentId : string;
  shippingAddress : string;
  billingAddress? : string;
}
