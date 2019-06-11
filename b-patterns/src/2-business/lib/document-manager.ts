import { COUNTRY_CONFIGURATIONS } from '../../3-infraestructure/database/config/country-configurations';
import { Checker } from '../../3-infraestructure/helper/checker';
import { ITemplateManager } from '../../3-infraestructure/helper/i-template-manager';
import { FileManager } from '../../3-infraestructure/helper/import/file-manager';
import { PathManager } from '../../3-infraestructure/helper/import/path-manager';
import { Logger } from '../../3-infraestructure/helper/logger';
import { Printer } from '../../3-infraestructure/helper/printer';
import { CountryConfiguration } from '../../3-infraestructure/models/country-configuration';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';

export abstract class DocumentManager {
  protected readonly countryConfigurations: CountryConfiguration[] = COUNTRY_CONFIGURATIONS;
  protected readonly checker = new Checker();
  protected readonly invoicePrefix = `invoice-`;
  protected readonly orderPrefix = `order-`;
  protected readonly fileManager = new FileManager();
  protected readonly pathManager = new PathManager();
  protected readonly logger = new Logger();
  protected readonly emailFolder = this.pathManager.emailFolder;
  protected readonly Printer = Printer;
  protected templateManager: ITemplateManager | undefined;

  constructor() {
    this.setTemplateManager();
  }

  public abstract send( shoppingCart: ShoppingCart ): void;
  protected abstract setTemplateManager(): void;
}
