import { Checker } from '../../../z-common/3-infraestructure/helper/checker';
import { LineItem } from '../../../z-common/3-infraestructure/models/line-item';
import { DOCUMENT_TYPES } from '../../3-infraestructure/database/config/document-types';
import { DocumentType } from '../../3-infraestructure/models/document-type';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { TaxBaseInfo } from '../../3-infraestructure/models/tax-base-info';
import { CheckOutCalculator } from './check-out-calculator';
import { TaxBaseInfoAdapter } from './tax-base-info-adapter';
import { TaxCalculator } from './tax-calculator';

export class CheckOutFacade {
  private readonly checker = new Checker();
  private readonly documentTypes = DOCUMENT_TYPES;
  private readonly checkOutCalculator: CheckOutCalculator;

  constructor( private shoppingCart: ShoppingCart ) {
    this.checkOutCalculator = new CheckOutCalculator( shoppingCart );
  }
  public calculateShippingCosts() {
    this.checkOutCalculator.calculateShippingCosts();
  }
  public applyPaymentMethodExtra( payment: string ) {
    this.checkOutCalculator.applyPaymentMethodExtra( payment );
  }
  public applyDiscount() {
    this.checkOutCalculator.applyDiscount();
  }
  public calculateTotalTax(): number {
    const totalTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLegalAmount( this.shoppingCart.legalAmounts );
    return TaxCalculator.calculateTax( totalTaxInfo );
  }
  public calculateLineTax( line: LineItem ): number {
    const lineTaxInfo: TaxBaseInfo = new TaxBaseInfoAdapter(
      this.shoppingCart.client
    ).getFromFromLineItem( line );
    return TaxCalculator.calculateTax( lineTaxInfo );
  }
  // public sendInvoice( shoppingCart: ShoppingCart ) {
  //   const invoiceManager = new InvoiceManager();
  //   invoiceManager.send( shoppingCart );
  // }
  // public sendOrder( shoppingCart: ShoppingCart ) {
  //   const orderManager = new OrderManager();
  //   orderManager.send( shoppingCart );
  // }
  public sendDocument( shoppingCart: ShoppingCart, documentTypeName: string ) {
    const documentType: DocumentType = this.checker.findSafe(
      this.documentTypes,
      ( documentType: DocumentType ) => documentType.typeName === documentTypeName
    );
    documentType.sender.send( shoppingCart );
  }
}
