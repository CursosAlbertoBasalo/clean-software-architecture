import { ShippingCost } from '../../../a-shopping-cart/3-infraestructure/models/shipping-cost';
export interface CountryConfiguration {
  countryName: string;
  thresholdForDiscount: number;
  shippingCost: ShippingCost[];
  warehouseAddress: string;
}
