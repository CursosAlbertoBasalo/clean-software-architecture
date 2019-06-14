import { Client } from './client';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartLine } from './shopping-cart-line';

export interface IShoppingCartDTO {
  shoppingCart: ShoppingCart;
  lineItems: ShoppingCartLine[];
  client: Client;
}
