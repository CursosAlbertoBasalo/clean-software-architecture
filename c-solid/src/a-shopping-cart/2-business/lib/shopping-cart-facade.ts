import { IManageFiles } from '../../../z-common/3-infrastructure/models/i-manage-files';
import { ManageFilesFactory } from '../../3-infrastructure/database/manage-files-factory';
import { ShoppingCartSaver } from '../../3-infrastructure/database/shopping-cart-saver';
import { CheckOut } from '../../3-infrastructure/models/check-out';
import { Client } from '../../3-infrastructure/models/client';
import { ShoppingCart } from '../../3-infrastructure/models/shopping-cart';
import { ShoppingCartBuilder } from './shopping-cart-builder';

export class ShoppingCartFacade {
  private shoppingCartBuilder: ShoppingCartBuilder | undefined;
  private readonly fileManager: IManageFiles = new ManageFilesFactory().createInstance();
  private readonly shoppingCartSaver = new ShoppingCartSaver( this.fileManager );

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
