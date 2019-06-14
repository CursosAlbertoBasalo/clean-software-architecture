import { ToolsFacade } from '../../../z-common/3-infrastructure/helper/tools-facade';
import { ICheck } from '../../../z-common/3-infrastructure/models/i-check';
import { LOCAL_TAXES_TREE } from '../../3-infrastructure/database/config/local-taxes-tree';
import { CountryTaxNode } from '../../3-infrastructure/models/country-tax-node';
import { RegionTaxNode } from '../../3-infrastructure/models/region-tax-node';
import { TaxBaseInfo } from '../../3-infrastructure/models/tax-base-info';

export class TaxCalculator {
  private static readonly decimalPlaces: number = 2;
  private static readonly taxExemptRegion: string = 'St Pierre';
  private static readonly localTaxesTree: CountryTaxNode[] = LOCAL_TAXES_TREE;
  private static readonly toolsFacade: ICheck = new ToolsFacade();

  public static calculateTax( taxBaseInfo: TaxBaseInfo ): number {
    if ( TaxCalculator.isTaxExempt( taxBaseInfo ) ) {
      return 0;
    } else {
      return TaxCalculator.calculateLocalTax( taxBaseInfo );
    }
  }

  private static isTaxExempt( taxBaseInfo: TaxBaseInfo ): boolean {
    return (
      taxBaseInfo.isATaxFreeProduct === true ||
      taxBaseInfo.isStudent === true ||
      taxBaseInfo.region === TaxCalculator.taxExemptRegion
    );
  }

  private static calculateLocalTax( taxBaseInfo: TaxBaseInfo ): number {
    const localVAT = TaxCalculator.getLocalVAT( taxBaseInfo );
    const baseTax = ( taxBaseInfo.base * localVAT ) / 100;
    const localTax = baseTax.toFixed( TaxCalculator.decimalPlaces );
    return Number( localTax );
  }

  private static getLocalVAT( taxBaseInfo: TaxBaseInfo ): number {
    const countryTaxNode = TaxCalculator.toolsFacade.findSafe(
      TaxCalculator.localTaxesTree,
      ( countryTaxNode: CountryTaxNode ) => countryTaxNode.name === taxBaseInfo.country
    );
    return TaxCalculator.getCountryVAT( countryTaxNode, taxBaseInfo.region );
  }

  private static getCountryVAT( countryTaxNode: CountryTaxNode, regionName: string ): number {
    const regionTaxNode = TaxCalculator.toolsFacade.findSafe(
      TaxCalculator.localTaxesTree,
      ( regionTaxNode: RegionTaxNode ) => regionTaxNode.name === regionName,
      countryTaxNode
    );
    return regionTaxNode.localVAT;
  }
}
