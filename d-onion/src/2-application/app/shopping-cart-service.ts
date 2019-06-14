import { IShoppingCart } from '../../1-domain/model/i-shopping-cart';
import { IShoppingCartRules } from '../../1-domain/services/i-shopping-cart-rules';
import { ShoppingCartRules } from '../../1-domain/services/shopping-cart-rules';
import { IShoppingCartRepository } from './i-shopping-cart-repository';
import { IShoppingCartService } from './i-shopping-cart-service';
import { ShoppingCartAdapter } from './shopping-cart-adapter';

export class ShoppingCartService implements IShoppingCartService {
  private readonly shoppingCartRules: IShoppingCartRules = new ShoppingCartRules();
  constructor( private readonly shoppingCartRepository: IShoppingCartRepository ) { }

  public load( shoppingCartId: string ): IShoppingCart {
    console.log( 'load shopping cart DTO ' + shoppingCartId );
    const shoppingCartDTO = this.shoppingCartRepository.select( shoppingCartId );
    console.log( 'adapt shopping cart DTO to domain ' + shoppingCartId );
    const shoppingCart = new ShoppingCartAdapter( shoppingCartDTO );
    if ( this.confirm( shoppingCart ) ) {
      return shoppingCart;
    } else {
      throw new Error( 'Invalid Shopping Cart' );
    }
  }
  public confirm( shoppingCart: IShoppingCart ): boolean {
    console.log( 'confirm' );
    return this.shoppingCartRules.confirm( shoppingCart );
  }
}
