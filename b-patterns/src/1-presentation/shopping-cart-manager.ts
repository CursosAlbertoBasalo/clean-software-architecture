import { CheckOutCalculator } from '../2-business/lib/check-out-calculator';
import { DocumentManager } from '../2-business/lib/document-manager';
import { ShoppingCartBuilder } from '../2-business/lib/shopping-cart-builder';
import { TaxCalculator } from '../2-business/lib/tax-calculator';
import { ShoppingCartSaver } from '../3-infraestructure/database/shopping-cart-saver';
import { CheckOut } from '../3-infraestructure/models/check-out';
import { Client } from '../3-infraestructure/models/client';
import { LineItem } from '../3-infraestructure/models/line-item';
import { ShoppingCart } from '../3-infraestructure/models/shopping-cart';
import { WarehouseAdministrator } from './warehouse-administrator';

export class ShoppingCartManager {
  constructor( client: Client ) {
    this.shoppingCartBuilder = new ShoppingCartBuilder( client );
    this.shoppingCart = this.shoppingCartBuilder.build();
    this.checkOutCalculator = new CheckOutCalculator( this.shoppingCart );
  }
  public readonly shoppingCart: ShoppingCart;
  private readonly shoppingCartBuilder: ShoppingCartBuilder;
  private readonly shoppingCartSaver = new ShoppingCartSaver();
  private readonly documentManager: DocumentManager = new DocumentManager();
  private readonly checkOutCalculator: CheckOutCalculator;

  public addLineItem( purchasedItem: LineItem ) {
    this.shoppingCart.lineItems.push( purchasedItem );
  }
  public removeLineItem( productName: string ) {
    this.shoppingCart.lineItems = this.shoppingCart.lineItems.filter(
      lineItem => lineItem.productName !== productName
    );
  }

  public loadFromStorage() {
    this.shoppingCartSaver.loadFromStorage( this.shoppingCart );
  }
  public saveToStorage() {
    this.shoppingCartSaver.saveToStorage( this.shoppingCart );
  }
  public calculateCheckOut( checkOut: CheckOut ) {
    this.shoppingCartBuilder.setCheckOut( checkOut );
    this.calculateTotalAmount();
    this.checkOutCalculator.calculateShippingCosts();
    this.checkOutCalculator.applyPaymentMethodExtra( checkOut.paymentMethod );
    this.checkOutCalculator.applyDiscount();
    const totalTaxInfo = {
      base: this.shoppingCart.legalAmounts.amount,
      country: this.shoppingCart.client.country,
      region: this.shoppingCart.client.region,
      isStudent: this.shoppingCart.client.isStudent,
      isATaxFreeProduct: false
    };
    this.shoppingCart.legalAmounts.taxes += TaxCalculator.calculateTax( totalTaxInfo );
    this.setInvoiceNumber();
    this.sendOrderToWarehouse();
    this.shoppingCartSaver.deleteFromStorage( this.shoppingCart );
  }

  public sendInvoiceToCustomer() {
    this.documentManager.sendInvoice( this.shoppingCart );
  }

  private setInvoiceNumber() {
    const lastInvoiceNumber = this.shoppingCartSaver.readLastInvoiceNumber();
    this.shoppingCart.legalAmounts.invoiceNumber = lastInvoiceNumber + 1;
    this.shoppingCartSaver.writeLastInvoiceNumber( this.shoppingCart );
  }

  private calculateTotalAmount() {
    const warehouseAdministrator = new WarehouseAdministrator();
    this.shoppingCart.lineItems.forEach( line => {
      this.processLineItem( warehouseAdministrator, line );
    } );
  }

  private processLineItem( warehouseAdministrator: WarehouseAdministrator, line: LineItem ) {
    line.quantity = warehouseAdministrator.updatePurchasedProduct( line );
    line.amount = line.price * line.quantity;
    this.shoppingCart.legalAmounts.amount += line.amount;
    this.addTaxesByProduct( line );
  }

  private addTaxesByProduct( line: LineItem ) {
    const lineTaxInfo = {
      base: line.amount,
      country: this.shoppingCart.client.country,
      region: this.shoppingCart.client.region,
      isStudent: this.shoppingCart.client.isStudent,
      isATaxFreeProduct: line.taxFree
    };
    line.taxes = TaxCalculator.calculateTax( lineTaxInfo );
    this.shoppingCart.legalAmounts.taxes += line.taxes;
  }

  private sendOrderToWarehouse() {
    this.documentManager.sendOrder( this.shoppingCart );
  }
}
