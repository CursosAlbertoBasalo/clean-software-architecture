import { ShoppingCart } from '../../1-domain/model/shopping-cart';
import { IShoppingCartService } from '../../1-domain/services/i-shopping-cart-service';
import { IShoppingCartRepository } from './i-shopping-cart-repository';

export class ShoppingCartService implements IShoppingCartService {
  constructor( private readonly shoppingCartRepository: IShoppingCartRepository ) { }

  public load( shoppingCartId: string ): ShoppingCart {
    console.log( 'load shopping cart ' + shoppingCartId );
    return this.shoppingCartRepository.select( shoppingCartId );
  }
  public confirm( shoppingCart: ShoppingCart ): boolean {
    console.log( 'confirm' );
    return true;
  }
}
