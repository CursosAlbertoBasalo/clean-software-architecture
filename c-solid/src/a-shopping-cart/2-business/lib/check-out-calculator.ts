import { COUNTRY_CONFIGURATIONS } from '../../../z-common/3-infrastructure/database/config/country-configurations';
import { ToolsFacade } from '../../../z-common/3-infrastructure/helper/tools-facade';
import { CountryConfiguration } from '../../../z-common/3-infrastructure/models/country-configuration';
import { ICheck } from '../../../z-common/3-infrastructure/models/i-check';
import { ShippingCost } from '../../../z-common/3-infrastructure/models/shipping-cost';
import { PAYMENTS_CONFIGURATIONS } from '../../3-infrastructure/database/config/payments-configurations';
import { PaymentConfiguration } from '../../3-infrastructure/models/payment-configuration';
import { ShoppingCart } from '../../3-infrastructure/models/shopping-cart';

export class CheckOutCalculator {
  private readonly countryConfigurations: CountryConfiguration[] = COUNTRY_CONFIGURATIONS;
  private readonly paymentsConfigurations: PaymentConfiguration[] = PAYMENTS_CONFIGURATIONS;
  private readonly discountFactor = 0.9;
  private readonly toolsFacade: ICheck = new ToolsFacade();

  constructor( private readonly shoppingCart: ShoppingCart ) { }

  public calculateShippingCosts() {
    const countryConfiguration = this.getCountryConfiguration();
    countryConfiguration.shippingCost.forEach( ( shippingCost: ShippingCost ) => {
      if ( this.hasShippingCost( shippingCost ) ) {
        const shippingCostAmount =
          this.shoppingCart.legalAmounts.amount * shippingCost.factor + shippingCost.plus;
        this.shoppingCart.legalAmounts.amount += shippingCostAmount;
        return;
      }
    } );
  }

  public applyPaymentMethodExtra( payment: string ) {
    const paymentConfiguration: PaymentConfiguration = this.getPaymentConfiguration( payment );
    this.shoppingCart.legalAmounts.amount =
      this.shoppingCart.legalAmounts.amount * paymentConfiguration.extraFactor;
  }

  public applyDiscount() {
    if ( this.hasDiscount() ) {
      this.shoppingCart.legalAmounts.amount *= this.discountFactor;
    }
  }

  private hasShippingCost( shippingCost: ShippingCost ) {
    return this.shoppingCart.legalAmounts.amount < shippingCost.upTo;
  }

  private hasDiscount() {
    return this.shoppingCart.client.isVip || this.hasCountryDiscount();
  }

  private hasCountryDiscount() {
    const countryConfiguration = this.getCountryConfiguration();
    return this.shoppingCart.legalAmounts.amount > countryConfiguration.thresholdForDiscount;
  }

  private getCountryConfiguration() {
    return this.toolsFacade.findSafe(
      this.countryConfigurations,
      countryConfiguration =>
        countryConfiguration.countryName === this.shoppingCart.client.country
    );
  }
  private getPaymentConfiguration( payment: string ) {
    return this.toolsFacade.findSafe(
      this.paymentsConfigurations,
      paymentConfiguration => paymentConfiguration.paymentMethod === payment
    );
  }
}
