import { IShoppingCart } from '../model/i-shopping-cart';

export interface IShoppingCartService {
  load( shoppingCartId: string ): IShoppingCart;
  confirm( shoppingCart: IShoppingCart ): boolean;
}
