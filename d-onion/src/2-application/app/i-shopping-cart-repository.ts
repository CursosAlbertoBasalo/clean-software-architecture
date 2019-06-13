import { ShoppingCart } from '../../1-domain/model/shopping-cart';

export interface IShoppingCartRepository {
  select( id: string ): ShoppingCart;
}
