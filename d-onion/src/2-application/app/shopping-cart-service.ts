import { IShoppingCart } from '../../1-domain/model/i-shopping-cart';
import { IShoppingCartService } from '../../1-domain/services/i-shopping-cart-service';
import { IShoppingCartRepository } from './i-shopping-cart-repository';
import { ShoppingCartAdapter } from './shopping-cart-adapter';

export class ShoppingCartService implements IShoppingCartService {
  constructor( private readonly shoppingCartRepository: IShoppingCartRepository ) { }

  public load( shoppingCartId: string ): IShoppingCart {
    console.log( 'load shopping cart DTO ' + shoppingCartId );
    const shoppingCartDTO = this.shoppingCartRepository.select( shoppingCartId );
    console.log( 'adapt shopping cart DTO to domain ' + shoppingCartId );
    const adp = new ShoppingCartAdapter( shoppingCartDTO );

    return adp;
  }
  public confirm( shoppingCart: IShoppingCart ): boolean {
    console.log( 'confirm' );
    return true;
  }
}
