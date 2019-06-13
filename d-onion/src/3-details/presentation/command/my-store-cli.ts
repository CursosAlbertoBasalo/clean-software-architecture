import { ShoppingCartService } from '../../../2-application/app/shopping-cart-service';
import { ShoppingCartRepository } from '../../infrastructure/data/shopping-cart-repository';

export class MyStoreCLI {
  public start() {
    console.log( 'Load Shopping cart' );
    const shoppingCartId = 'A-jsn1';
    const shoppingCartRepository = new ShoppingCartRepository();
    const shoppingCartService = new ShoppingCartService( shoppingCartRepository );
    const shoppingCart = shoppingCartService.load( shoppingCartId );
    console.log( 'Loaded Shopping cart', shoppingCart );
  }
}
