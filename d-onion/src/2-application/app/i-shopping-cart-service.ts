import { IShoppingCart } from '../../1-domain/model/i-shopping-cart';

export interface IShoppingCartService {
  load( shoppingCartId: string ): IShoppingCart;
  confirm( shoppingCart: IShoppingCart ): boolean;
}
