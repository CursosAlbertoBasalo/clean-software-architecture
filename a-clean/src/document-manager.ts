import { COUNTRY_CONFIGURATIONS } from './database/config/country-configurations';
import { Checker } from './helper/checker';
import { Logger } from './helper/logger';
import { Printer } from './helper/printer';
import { FileManager } from './import/file-manager';
import { PathManager } from './import/path-manager';
import { TemplateManager } from './lib/template-manager';
import { CountryConfiguration } from './models/country-configuration';
import { ShoppingCart } from './models/shopping-cart';

export class DocumentManager {
  private readonly countryConfigurations : CountryConfiguration[] = COUNTRY_CONFIGURATIONS;
  private readonly checker = new Checker();
  private readonly invoicePrefix = `invoice-`;
  private readonly orderPrefix = `order-`;
  private readonly templateManager = new TemplateManager();
  private readonly fileManager = new FileManager();
  private readonly pathManager = new PathManager();
  private readonly logger = new Logger();
  private readonly emailFolder = this.pathManager.emailFolder;

  public sendOrder( shoppingCart : ShoppingCart ) {
    const orderContent = this.templateManager.getOrderTemplate( shoppingCart );
    const orderMessageTemplate = this.templateManager.getOrderMessageTemplate( orderContent );
    this.fileManager.ensureFolder( this.emailFolder );
    const orderFileName = this.getOrderFileName( shoppingCart );
    this.fileManager.writeFile( { path: orderFileName, content: orderMessageTemplate } );
    this.logger.print( 'Sent Order: ' + shoppingCart.legalAmounts.invoiceNumber );
  }

  public sendInvoice( shoppingCart : ShoppingCart ) {
    const invoiceTemplate = this.templateManager.getInvoiceTemplate( shoppingCart );
    this.printInvoice( shoppingCart, invoiceTemplate );
    this.sendEmailInvoice( shoppingCart.client.email, invoiceTemplate );
    this.logger.print( 'Sent Invoice: ' + shoppingCart.legalAmounts.invoiceNumber );
  }

  private sendEmailInvoice( emailAddress : string, invoiceContent : string ) {
    const invoiceMessageTemplate = this.templateManager.getInvoiceMessageTemplate( invoiceContent );
    this.fileManager.ensureFolder( this.emailFolder );
    const invoiceFileName = this.getInvoiceFileName( emailAddress );
    this.fileManager.writeFile( { path: invoiceFileName, content: invoiceMessageTemplate } );
  }

  private printInvoice( shoppingCart : ShoppingCart, documentContent : string ) {
    const fileName = `${this.invoicePrefix}${shoppingCart.legalAmounts.invoiceNumber}.txt`;
    Printer.printContentToFile( { fileName, textContent: documentContent } );
  }

  private getOrderFileName( shoppingCart : ShoppingCart ) {
    const customerCountry : string = shoppingCart.client.country;
    const warehouseEmailAddress = this.getWarehouseAddressByCountry( customerCountry );
    const orderFileName = `${this.orderPrefix}${shoppingCart.legalAmounts.invoiceNumber}_${warehouseEmailAddress}.txt`;
    const fileName = this.pathManager.join( this.emailFolder, orderFileName );
    return fileName;
  }

  private getWarehouseAddressByCountry( customerCountry : string ) {
    const countryConfiguration = this.checker.findSafe(
      this.countryConfigurations,
      country => country.countryName === customerCountry
    );
    return countryConfiguration.warehouseAddress;
  }

  private getInvoiceFileName( emailAddress : string ) {
    const invoiceFileName = `${this.invoicePrefix}${emailAddress}.txt`;
    const fileName = this.pathManager.join( this.emailFolder, invoiceFileName );
    return fileName;
  }
}
