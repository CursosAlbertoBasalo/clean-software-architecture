import { DocumentManager } from './document-manager';
import { CheckOutCalculator } from './lib/check-out-calculator';
import { ShoppingCartSaver } from './lib/shopping-cart-saver';
import { TaxCalculator } from './lib/tax-calculator';
import { CheckOut } from './models/check-out';
import { Client } from './models/client';
import { LineItem } from './models/line-item';
import { ShoppingCart } from './models/shopping-cart';
import { WarehouseAdministrator } from './warehouse-administrator';

export class ShoppingCartManager {
  constructor( client : Client ) {
    this.shoppingCart = {
      client: client,
      lineItems: [],
      checkOut: {
        paymentMethod: '',
        paymentId: '',
        shippingAddress: '',
        billingAddress: ''
      },
      legalAmounts: { total: 0, shippingCost: 0, taxes: 0, invoiceNumber: 0 }
    };
    this.checkOutCalculator = new CheckOutCalculator( this.shoppingCart );
  }
  private readonly shoppingCart : ShoppingCart;
  private readonly shoppingCartSaver = new ShoppingCartSaver();
  private readonly documentManager : DocumentManager = new DocumentManager();
  private readonly checkOutCalculator : CheckOutCalculator;

  public addLineItem( purchasedItem : LineItem ) {
    this.shoppingCart.lineItems.push( purchasedItem );
  }
  public removeLineItem( productName : string ) {
    this.shoppingCart.lineItems = this.shoppingCart.lineItems.filter( lineItem => lineItem.productName !== productName );
  }

  public loadFromStorage() {
    this.shoppingCartSaver.loadFromStorage( this.shoppingCart );
  }
  public saveToStorage() {
    this.shoppingCartSaver.saveToStorage( this.shoppingCart );
  }
  public calculateCheckOut( checkOut : CheckOut ) {
    this.setCheckOut( checkOut );
    this.calculateTotalAmount();
    this.checkOutCalculator.calculateShippingCosts();
    this.checkOutCalculator.applyPaymentMethodExtra( checkOut.paymentMethod );
    this.checkOutCalculator.applyDiscount();
    const totalTaxInfo = {
      base: this.shoppingCart.legalAmounts.total,
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

  private setCheckOut( checkOut : CheckOut ) {
    if ( !this.hasContent( checkOut.billingAddress ) ) {
      if ( this.hasContent( checkOut.shippingAddress ) ) {
        checkOut.billingAddress = checkOut.shippingAddress;
      }
    }
    checkOut.billingAddress = '';
    this.shoppingCart.checkOut = checkOut;
  }

  private hasContent( content? : string ) {
    return content !== undefined && content !== null && content.length > 0;
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

  private processLineItem( warehouseAdministrator : WarehouseAdministrator, line : LineItem ) {
    line.quantity = warehouseAdministrator.updatePurchasedProduct( line );
    line.amount = line.price * line.quantity;
    this.shoppingCart.legalAmounts.total += line.amount;
    this.addTaxesByProduct( line );
  }

  private addTaxesByProduct( line : LineItem ) {
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
