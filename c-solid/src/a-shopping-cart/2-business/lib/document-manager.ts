import { COUNTRY_CONFIGURATIONS } from '../../../z-common/3-infrastructure/database/config/country-configurations';
import { ToolsFacade } from '../../../z-common/3-infrastructure/helper/tools-facade';
import { CountryConfiguration } from '../../../z-common/3-infrastructure/models/country-configuration';
import { ITemplateManager } from '../../3-infrastructure/helper/i-template-manager';
import { ISendDocuments } from '../../3-infrastructure/models/i-send-documents';
import { ShoppingCart } from '../../3-infrastructure/models/shopping-cart';

export abstract class DocumentManager implements ISendDocuments {
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
