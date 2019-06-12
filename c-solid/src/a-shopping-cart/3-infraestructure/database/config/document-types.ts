import { InvoiceManager } from '../../../2-business/lib/invoice-manager';
import { OrderManager } from '../../../2-business/lib/order-manager';
import { DocumentType } from '../../models/document-type';
import { ShoppingCart } from '../../models/shopping-cart';

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    typeName: '*default*',
    prefix: '-',
    sender: {
      send( shoppingCart: ShoppingCart ) {
        shoppingCart;
      }
    }
  },
  {
    typeName: 'order',
    prefix: 'order-',
    sender: new OrderManager()
  },
  {
    typeName: 'invoice',
    prefix: 'invoice-',
    sender: new InvoiceManager()
  }
];
