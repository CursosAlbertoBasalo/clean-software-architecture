import { LineItem } from '../../../z-common/3-infraestructure/models/line-item';
import { Client } from '../../3-infraestructure/models/client';
import { LegalAmounts } from '../../3-infraestructure/models/legal-amounts';
import { TaxBaseInfo } from '../../3-infraestructure/models/tax-base-info';

export class TaxBaseInfoAdapter implements TaxBaseInfo {
  public base: number;
  public country: string;
  public region: string;
  public isStudent: boolean;
  public isATaxFreeProduct: boolean | undefined;

  constructor( client: Client ) {
    this.base = 0;
    this.country = client.country;
    this.region = client.region;
    this.isStudent = client.isStudent;
    this.isATaxFreeProduct = false;
  }

  public getFromFromLineItem( line: LineItem ) {
    this.base = line.amount;
    this.isATaxFreeProduct = line.taxFree;
    return this;
  }
  public getFromFromLegalAmount( legalAmounts: LegalAmounts ) {
    this.base = legalAmounts.amount;
    return this;
  }
}
