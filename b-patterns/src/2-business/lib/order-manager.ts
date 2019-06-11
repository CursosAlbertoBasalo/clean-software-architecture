import { OrderTemplateManager } from '../../3-infraestructure/helper/order-template-manager';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { DocumentManager } from './document-manager';

export class OrderManager extends DocumentManager {
  constructor() {
    super();
  }
  protected setTemplateManager() {
    this.templateManager = new OrderTemplateManager();
  }
  public send( shoppingCart: ShoppingCart ) {
    if ( this.templateManager !== undefined ) {
      const orderContent = this.templateManager.getTemplate( shoppingCart );
      const orderMessageTemplate = this.templateManager.getMessage( orderContent );
      this.toolsFacade.ensureFolder( this.emailFolder );
      const orderFileName = this.getFileName( shoppingCart );
      this.toolsFacade.writeFile( { path: orderFileName, content: orderMessageTemplate } );
      this.toolsFacade.log( 'Sent Order: ' + shoppingCart.legalAmounts.invoiceNumber );
    }
  }
  private getFileName( shoppingCart: ShoppingCart ) {
    const customerCountry: string = shoppingCart.client.country;
    const warehouseEmailAddress = this.getWarehouseAddressByCountryTEMP( customerCountry );
    const orderFileName = `${this.orderPrefix}${
      shoppingCart.legalAmounts.invoiceNumber
    }_${warehouseEmailAddress}.txt`;
    const fileName = this.toolsFacade.joinPaths( this.emailFolder, orderFileName );
    return fileName;
  }

  private getWarehouseAddressByCountryTEMP( customerCountry: string ) {
    const countryConfiguration = this.checker.findSafe(
      this.countryConfigurations,
      country => country.countryName === customerCountry
    );
    return countryConfiguration.warehouseAddress;
  }
}
