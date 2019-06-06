import { PaymentConfiguration } from '../../models/payment-configuration';
export const PAYMENTS_CONFIGURATIONS : PaymentConfiguration[] = [
  {
    paymentMethod: '*default*',
    extraFactor: 1
  },
  {
    paymentMethod: 'PayPal',
    extraFactor: 1.05
  }
];
