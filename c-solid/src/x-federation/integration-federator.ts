import { ShoppingCartManager } from '../a-shopping-cart/1-presentation/shopping-cart-manager';
import { CheckOut } from '../a-shopping-cart/3-infraestructure/models/check-out';
import { Client } from '../a-shopping-cart/3-infraestructure/models/client';
import { WarehouseAdministrator } from '../b-warehouse/1-presentation/warehouse-administrator';
import { LineItem } from '../z-common/3-infraestructure/models/line-item';

export class IntegrationFederator {
  public readonly shoppingCartManager: ShoppingCartManager;
  private readonly warehouseAdministrator: WarehouseAdministrator;

  constructor( client: Client ) {
    this.shoppingCartManager = new ShoppingCartManager( client );
    this.warehouseAdministrator = new WarehouseAdministrator();
  }

  public addLineItem( purchasedItem: LineItem ) {
    this.shoppingCartManager.addLineItem( purchasedItem );
  }
  public removeLineItem( productName: string ) {
    this.shoppingCartManager.removeLineItem( productName );
  }

  public loadFromStorage() {
    this.shoppingCartManager.loadFromStorage();
  }
  public saveToStorage() {
    this.shoppingCartManager.saveToStorage();
  }
  public calculateCheckOut( checkOut: CheckOut ) {
    this.shoppingCartManager.calculateCheckOut( checkOut );
  }

  public sendInvoiceToCustomer() {
    this.shoppingCartManager.sendInvoiceToCustomer();
  }

  public updatePurchasedProduct( purchasedItem: LineItem ): number {
    return this.warehouseAdministrator.updatePurchasedProduct( purchasedItem );
  }
}
