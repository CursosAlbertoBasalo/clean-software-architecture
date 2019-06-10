import { CheckOut } from './check-out';
import { Client } from './client';
import { LegalAmounts } from './legal-amounts';
import { LineItem } from './line-item';

export interface ShoppingCart {
  client : Client;
  lineItems : LineItem[];
  checkOut : CheckOut;
  legalAmounts : LegalAmounts;
}
