import { COUNTRY_CONFIGURATIONS } from '../../../3-infraestructure/database/config/country-configurations';
import { ToolsFacade } from '../../../z-common/3-infraestructure/helper/tools-facade';
import { CountryConfiguration } from '../../../z-common/3-infraestructure/models/country-configuration';
import { ITemplateManager } from '../../3-infraestructure/helper/i-template-manager';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';

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
