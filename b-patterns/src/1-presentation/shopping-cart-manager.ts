import { CheckOutCalculator } from '../2-business/lib/check-out-calculator';
import { InvoiceManager } from '../2-business/lib/invoice-manager';
import { OrderManager } from '../2-business/lib/order-manager';
import { ShoppingCartFacade } from '../2-business/lib/shopping-cart-facade';
import { TaxBaseInfoAdapter } from '../2-business/lib/tax-base-info-adapter';
import { TaxCalculator } from '../2-business/lib/tax-calculator';
import { CheckOut } from '../3-infraestructure/models/check-out';
import { Client } from '../3-infraestructure/models/client';
import { LineItem } from '../3-infraestructure/models/line-item';
import { ShoppingCart } from '../3-infraestructure/models/shopping-cart';
import { TaxBaseInfo } from '../3-infraestructure/models/tax-base-info';
import { WarehouseAdministrator } from './warehouse-administrator';

export class ShoppingCartManager {
  private readonly shoppingCartFacade = new ShoppingCartFacade();
  constructor( client: Client ) {
    this.shoppingCart = this.shoppingCartFacade.buildShoppingCart( client );
    this.checkOutCalculator = new CheckOutCalculator( this.shoppingCart );
  }
  public readonly shoppingCart: ShoppingCart;

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
    this.shoppingCartFacade.loadFromStorage( this.shoppingCart );
  }
  public saveToStorage() {
    this.shoppingCartFacade.saveToStorage( this.shoppingCart );
  }
  public calculateCheckOut( checkOut: CheckOut ) {
    this.shoppingCartFacade.setCheckOut( checkOut );
    this.calculateTotalAmount();
    this.checkOutCalculator.calculateShippingCosts();
    this.checkOutCalculator.applyPaymentMethodExtra( checkOut.paymentMethod );
    this.checkOutCalculator.applyDiscount();
    const totalTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLegalAmount( this.shoppingCart.legalAmounts );
    this.shoppingCart.legalAmounts.taxes += TaxCalculator.calculateTax( totalTaxInfo );
    this.setInvoiceNumber();
    this.sendOrderToWarehouse();
    this.shoppingCartFacade.deleteFromStorage( this.shoppingCart );
  }

  public sendInvoiceToCustomer() {
    const invoiceManager = new InvoiceManager();
    invoiceManager.send( this.shoppingCart );
  }

  private setInvoiceNumber() {
    const lastInvoiceNumber = this.shoppingCartFacade.readLastInvoiceNumber();
    this.shoppingCart.legalAmounts.invoiceNumber = lastInvoiceNumber + 1;
    this.shoppingCartFacade.writeLastInvoiceNumber( this.shoppingCart );
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
    const lineTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLineItem( line );
    line.taxes = TaxCalculator.calculateTax( lineTaxInfo );
    this.shoppingCart.legalAmounts.taxes += line.taxes;
  }

  private sendOrderToWarehouse() {
    const orderManager = new OrderManager();
    orderManager.send( this.shoppingCart );
  }
}
