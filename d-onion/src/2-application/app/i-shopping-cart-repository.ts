import { IShoppingCartDTO } from '../model/i-shopping-cart-dto';

export interface IShoppingCartRepository {
  select( shoppingCartId: string ): IShoppingCartDTO;
}
