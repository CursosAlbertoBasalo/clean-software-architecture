import { ToolsFacade } from '../../../z-common/3-infraestructure/helper/tools-facade';
import { CheckOut } from '../../3-infraestructure/models/check-out';
import { Client } from '../../3-infraestructure/models/client';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';

export class ShoppingCartBuilder {
  private shoppingCart: ShoppingCart | undefined;
  private readonly toolsFacade = new ToolsFacade();

  constructor( private readonly client: Client ) { }

  public build(): ShoppingCart {
    this.shoppingCart = {
      client: this.client,
      lineItems: [],
      checkOut: {
        paymentMethod: '',
        paymentId: '',
        shippingAddress: '',
        billingAddress: ''
      },
      legalAmounts: { amount: 0, shippingCost: 0, taxes: 0, invoiceNumber: 0 }
    };
    return this.shoppingCart;
  }

  public setCheckOut( checkOut: CheckOut ): ShoppingCart {
    if ( !this.toolsFacade.hasStringContent( checkOut.billingAddress ) ) {
      if ( this.toolsFacade.hasStringContent( checkOut.shippingAddress ) ) {
        checkOut.billingAddress = checkOut.shippingAddress;
      }
    }
    if ( this.shoppingCart === undefined ) {
      this.shoppingCart = this.build();
    }
    this.shoppingCart.checkOut = checkOut;
    return this.shoppingCart;
  }
}
