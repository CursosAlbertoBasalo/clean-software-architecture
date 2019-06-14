import { ShoppingCart } from '../models/shopping-cart';
import { ITemplateManager } from './i-template-manager';

export class InvoiceTemplateManager implements ITemplateManager {
  public getTemplate( shoppingCart: ShoppingCart ): string {
    const invoiceTemplate = `
    LEGAL INVOICE FROM acme!
    ========================
    Invoice Number: ${shoppingCart.legalAmounts.invoiceNumber}#
    ----------------------------------------------
    ${shoppingCart.client.name} - ${shoppingCart.client.taxNumber}
    ${shoppingCart.checkOut.billingAddress}
    ${shoppingCart.client.country} - ${shoppingCart.client.region}
    Items purchased:
    ${this.getDocumentItemLines( shoppingCart )}
    Amount: #${shoppingCart.legalAmounts.amount - shoppingCart.legalAmounts.shippingCost}Euros
    Shipping Cost: #${shoppingCart.legalAmounts.shippingCost}Euros
    Base Amount: #${shoppingCart.legalAmounts.amount}Euros
    Tax: #${shoppingCart.legalAmounts.taxes}Euros
    Total Amount: #${shoppingCart.legalAmounts.amount + shoppingCart.legalAmounts.taxes}Euros
    `;
    return invoiceTemplate;
  }
  public getMessage( content: string ): string {
    const invoiceMessageTemplate = `
    ---
    See attached invoice.
    ---
    ${content}

    Thanks for your purchasing, the shop.acme.com
    ---`;
    return invoiceMessageTemplate;
  }
  private getDocumentItemLines( shoppingCart: ShoppingCart ) {
    return JSON.stringify( shoppingCart.lineItems );
  }
}
