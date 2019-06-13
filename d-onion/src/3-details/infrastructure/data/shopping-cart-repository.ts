import { ShoppingCart } from '../../../1-domain/model/shopping-cart';
import { IShoppingCartRepository } from '../../../2-application/app/i-shopping-cart-repository';

export class ShoppingCartRepository implements IShoppingCartRepository {
  public select( _id: string ): ShoppingCart {
    console.log( 'select * from shopping_carts where _id = ' + _id );
    const loadedShoppingCart = new ShoppingCart();
    loadedShoppingCart.id = _id;
    return loadedShoppingCart;
  }
}
