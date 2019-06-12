import { ShoppingCart } from './shopping-cart';

export interface ISendDocuments {
  send( shoppingCart: ShoppingCart ): void;
}
