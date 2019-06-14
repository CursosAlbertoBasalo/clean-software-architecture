import { LineItem } from '../../../z-common/3-infrastructure/models/line-item';
import { CheckOut } from './check-out';
import { Client } from './client';
import { LegalAmounts } from './legal-amounts';

export interface ShoppingCart {
  client: Client;
  lineItems: LineItem[];
  checkOut: CheckOut;
  legalAmounts: LegalAmounts;
}
