import { ShoppingCart } from '../models/shopping-cart';

export class TemplateManager {
  public getOrderTemplate( shoppingCart : ShoppingCart ) {
    const orderTemplate = `
    Invoice Number: ${shoppingCart.legalAmounts.invoiceNumber}
    ${shoppingCart.client.name} - ${shoppingCart.client.taxNumber}
    ${shoppingCart.checkOut.shippingAddress}
    Items purchased:
    ${this.getDocumentItemLines( shoppingCart )}
    `;
    return orderTemplate;
  }

  public getOrderMessageTemplate( orderContent : string ) {
    const orderMessageTemplate = `
    ---
    Serve this order ASAP.
    ---
    ${orderContent}
    Regards, the shop.acme.com
    ---`;
    return orderMessageTemplate;
  }

  public getInvoiceTemplate( shoppingCart : ShoppingCart ) {
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
    Amount: #${shoppingCart.legalAmounts.total - shoppingCart.legalAmounts.shippingCost}Euros
    Shipping Cost: #${shoppingCart.legalAmounts.shippingCost}Euros
    Base Amount: #${shoppingCart.legalAmounts.total}Euros
    Tax: #${shoppingCart.legalAmounts.taxes}Euros
    Total Amount: #${shoppingCart.legalAmounts.total + shoppingCart.legalAmounts.taxes}Euros
    `;
    return invoiceTemplate;
  }

  public getInvoiceMessageTemplate( invoiceContent : string ) {
    const invoiceMessageTemplate = `
    ---
    See attached invoice.
    ---
    ${invoiceContent}

    Thanks for your purchasing, the shop.acme.com
    ---`;
    return invoiceMessageTemplate;
  }

  private getDocumentItemLines( shoppingCart : ShoppingCart ) {
    return JSON.stringify( shoppingCart.lineItems );
  }
}
