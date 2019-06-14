import { IShoppingCart } from '../model/i-shopping-cart';

export interface IShoppingCartRules {
  confirm( shoppingCart: IShoppingCart ): boolean;
}
