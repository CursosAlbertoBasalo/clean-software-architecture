import { Product } from '../models/product';

export const PRODUCT_CATALOG : Product[] = [
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
