import { RegionTaxNode } from './region-tax-node';
export interface CountryTaxNode {
  name : string;
  localVAT : number;
  regionTaxes : RegionTaxNode[];
}
