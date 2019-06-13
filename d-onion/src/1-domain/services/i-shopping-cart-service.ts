import { ShoppingCart } from '../model/shopping-cart';

export interface IShoppingCartService {
  load( shoppingCartId: string ): ShoppingCart;
  confirm( shoppingCart: ShoppingCart ): boolean;
}
