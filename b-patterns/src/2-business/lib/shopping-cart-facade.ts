import { ShoppingCartSaver } from '../../3-infraestructure/database/shopping-cart-saver';
import { CheckOut } from '../../3-infraestructure/models/check-out';
import { Client } from '../../3-infraestructure/models/client';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { ShoppingCartBuilder } from './shopping-cart-builder';

export class ShoppingCartFacade {
  private shoppingCartBuilder: ShoppingCartBuilder | undefined;
  private readonly shoppingCartSaver = new ShoppingCartSaver();

  public buildShoppingCart( client: Client ): ShoppingCart {
    this.shoppingCartBuilder = new ShoppingCartBuilder( client );
    return this.shoppingCartBuilder.build();
  }

  public setCheckOut( checkOut: CheckOut ): ShoppingCart {
    if ( this.shoppingCartBuilder !== undefined ) {
      return this.shoppingCartBuilder.setCheckOut( checkOut );
    }
    throw 'No Shopping cart builder';
  }

  public loadFromStorage( shoppingCart: ShoppingCart ) {
    this.shoppingCartSaver.loadFromStorage( shoppingCart );
  }
  public saveToStorage( shoppingCart: ShoppingCart ) {
    this.shoppingCartSaver.saveToStorage( shoppingCart );
  }
  public deleteFromStorage( shoppingCart: ShoppingCart ) {
    this.shoppingCartSaver.deleteFromStorage( shoppingCart );
  }

  public writeLastInvoiceNumber( shoppingCart: ShoppingCart ) {
    this.shoppingCartSaver.writeLastInvoiceNumber( shoppingCart );
  }

  public readLastInvoiceNumber(): number {
    return this.shoppingCartSaver.readLastInvoiceNumber();
  }
}
