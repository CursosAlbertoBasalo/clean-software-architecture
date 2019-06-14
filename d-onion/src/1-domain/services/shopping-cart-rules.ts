import { IShoppingCart } from '../model/i-shopping-cart';
import { IShoppingCartRules } from './i-shopping-cart-rules';

export class ShoppingCartRules implements IShoppingCartRules {
  public confirm( shoppingCart: IShoppingCart ): boolean {
    if ( shoppingCart.client !== null ) {
      return true;
    } else {
      return false;
    }
  }
}
