import { IShoppingCart } from './i-shopping-cart';

export class ShoppingCart implements IShoppingCart {
  public id: string = '';
  public date: Date = new Date( '1/1/1970' );
  public amount: number = 0;
  public client: any;
}
