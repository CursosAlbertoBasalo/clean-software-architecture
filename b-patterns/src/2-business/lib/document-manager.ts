import { COUNTRY_CONFIGURATIONS } from '../../3-infrastructure/database/config/country-configurations';
import { ITemplateManager } from '../../3-infrastructure/helper/i-template-manager';
import { ToolsFacade } from '../../3-infrastructure/helper/tools-facade';
import { CountryConfiguration } from '../../3-infrastructure/models/country-configuration';
import { ShoppingCart } from '../../3-infrastructure/models/shopping-cart';

export abstract class DocumentManager {
  protected readonly countryConfigurations: CountryConfiguration[] = COUNTRY_CONFIGURATIONS;
  protected readonly invoicePrefix = `invoice-`;
  protected readonly orderPrefix = `order-`;
  protected readonly toolsFacade = new ToolsFacade();
  protected readonly emailFolder = this.toolsFacade.emailFolder;
  protected templateManager: ITemplateManager | undefined;

  constructor() {
    this.setTemplateManager();
  }

  public abstract send( shoppingCart: ShoppingCart ): void;
  protected abstract setTemplateManager(): void;
}
