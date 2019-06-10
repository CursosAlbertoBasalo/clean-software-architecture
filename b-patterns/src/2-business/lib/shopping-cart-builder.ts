import { Checker } from '../../3-infraestructure/helper/checker';
import { CheckOut } from '../../3-infraestructure/models/check-out';
import { Client } from '../../3-infraestructure/models/client';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';

export class ShoppingCartBuilder {
  public readonly shoppingCart: ShoppingCart;
  private readonly checker = new Checker();

  constructor( client: Client ) {
    this.shoppingCart = {
      client: client,
      lineItems: [],
      checkOut: {
        paymentMethod: '',
        paymentId: '',
        shippingAddress: '',
        billingAddress: ''
      },
      legalAmounts: { amount: 0, shippingCost: 0, taxes: 0, invoiceNumber: 0 }
    };
  }

  public setCheckOut( checkOut: CheckOut ) {
    if ( !this.checker.hasStringContent( checkOut.billingAddress ) ) {
      if ( this.checker.hasStringContent( checkOut.shippingAddress ) ) {
        checkOut.billingAddress = checkOut.shippingAddress;
      }
    }
    this.shoppingCart.checkOut = checkOut;
  }
}
