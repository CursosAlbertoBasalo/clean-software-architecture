import { ShippingCost } from './shipping-cost';
export interface CountryConfiguration {
  countryName : string;
  thresholdForDiscount : number;
  shippingCost : ShippingCost[];
  warehouseAddress : string;
}
