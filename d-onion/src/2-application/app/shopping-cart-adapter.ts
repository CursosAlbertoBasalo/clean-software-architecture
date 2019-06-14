import { IShoppingCart } from '../../1-domain/model/i-shopping-cart';
import { IShoppingCartDTO } from '../model/i-shopping-cart-dto';

export class ShoppingCartAdapter implements IShoppingCart {
  public id: string = '';
  public date: Date = new Date();
  public amount: number = 0;
  public client: any;

  constructor( shoppingCartDTO: IShoppingCartDTO ) {
    this.id = shoppingCartDTO.shoppingCart.id;
    this.date = shoppingCartDTO.shoppingCart.date;
    this.client = shoppingCartDTO.client;
    shoppingCartDTO.lineItems.forEach( line => ( this.amount += line.price * line.quantity ) );
  }
}
