import { ShoppingCart } from '../models/shopping-cart';
import { ITemplateManager } from './i-template-manager';

export class OrderTemplateManager implements ITemplateManager {
  public getTemplate( shoppingCart: ShoppingCart ): string {
    const orderTemplate = `
    Invoice Number: ${shoppingCart.legalAmounts.invoiceNumber}
    ${shoppingCart.client.name} - ${shoppingCart.client.taxNumber}
    ${shoppingCart.checkOut.shippingAddress}
    Items purchased:
    ${this.getDocumentItemLines( shoppingCart )}
    `;
    return orderTemplate;
  }
  public getMessage( content: string ): string {
    const orderMessageTemplate = `
    ---
    Serve this order ASAP.
    ---
    ${content}
    Regards, the shop.acme.com
    ---`;
    return orderMessageTemplate;
  }
  private getDocumentItemLines( shoppingCart: ShoppingCart ) {
    return JSON.stringify( shoppingCart.lineItems );
  }
}
