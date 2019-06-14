import { IShoppingCartRepository } from '../../../2-application/app/i-shopping-cart-repository';
import { Client } from '../../../2-application/model/client';
import { IShoppingCartDTO } from '../../../2-application/model/i-shopping-cart-dto';
import { ShoppingCart } from '../../../2-application/model/shopping-cart';
import { ShoppingCartLine } from '../../../2-application/model/shopping-cart-line';

export class ShoppingCartRepository implements IShoppingCartRepository {
  public select( _id: string ): IShoppingCartDTO {
    console.log( 'select * from shopping_carts where _id = ' + _id );
    const loadedShoppingCart = new ShoppingCart();
    loadedShoppingCart.id = _id;
    console.log( 'select * from shopping_carts_lines where shoppingCartId = ' + _id );
    const shoppingCartLine: ShoppingCartLine = new ShoppingCartLine();
    const loadedShoppingLines = [shoppingCartLine];
    console.log( 'select * from clients where _id = ' + loadedShoppingCart.clientId );
    const loadedClient: Client = new Client();
    const shoppingCartDTO: IShoppingCartDTO = {
      shoppingCart: loadedShoppingCart,
      lineItems: loadedShoppingLines,
      client: loadedClient
    };
    return shoppingCartDTO;
  }
}
