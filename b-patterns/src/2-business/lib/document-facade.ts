import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { InvoiceManager } from './invoice-manager';
import { OrderManager } from './order-manager';

export class DocumentFacade {
  public sendInvoice( shoppingCart: ShoppingCart ) {
    const invoiceManager = new InvoiceManager();
    invoiceManager.send( shoppingCart );
  }
  public sendOrder( shoppingCart: ShoppingCart ) {
    const orderManager = new OrderManager();
    orderManager.send( shoppingCart );
  }
}
