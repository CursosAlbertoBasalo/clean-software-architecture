import { LineItem } from '../../src/3-infraestructure/models/line-item';
import { Product } from '../../src/3-infraestructure/models/product';

export const client = {
  name: 'Alberto',
  isStudent: false,
  region: 'Galicia',
  country: 'Spain',
  email: 'alberto@code.dev',
  isVip: true,
  taxNumber: 'A12345678'
};

export const checkOutInfo = {
  paymentMethod: 'PayPal',
  paymentId: 'x-le/159',
  shippingAddress: 'One Street',
  billingAddress: 'Corp. Building'
};

export const LINE_ITEMS: LineItem[] = [
  {
    productName: 'computer',
    quantity: 1,
    price: 1000,
    country: client.country,
    taxFree: false,
    amount: 0,
    taxes: 0
  },
  {
    productName: 'monitor',
    quantity: 25,
    price: 200,
    country: client.country,
    taxFree: false,
    amount: 0,
    taxes: 0
  },
  {
    productName: 'course',
    quantity: 10,
    price: 100,
    country: client.country,
    taxFree: true,
    amount: 0,
    taxes: 0
  }
];

export const PRODUCT_CATALOG: Product[] = [
  {
    name: 'monitor',
    price: 1000,
    stock: 50,
    minimumStock: 20,
    isTaxFree: false
  },
  {
    name: 'computer',
    price: 200,
    stock: 20,
    minimumStock: 3,
    isTaxFree: false
  },
  {
    name: 'printer',
    price: 1000,
    stock: 10,
    minimumStock: 5,
    isTaxFree: false
  },
  {
    name: 'course',
    price: 100,
    stock: 1000000,
    minimumStock: 1000000,
    isTaxFree: true
  }
];

export const bigBuyer: LineItem = {
  productName: 'monitor',
  quantity: 40,
  price: 200,
  country: client.country,
  taxFree: false,
  amount: 0,
  taxes: 0
};
