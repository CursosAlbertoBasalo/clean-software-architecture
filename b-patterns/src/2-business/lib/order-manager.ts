import { OrderTemplateManager } from '../../3-infraestructure/helper/order-template-manager';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { DocumentManager } from './document-manager';

export class OrderManager extends DocumentManager {
  protected getTemplateManager() {
    super.iTemplateManager = new OrderTemplateManager();
  }
  public send( shoppingCart: ShoppingCart ) {
    if ( super.iTemplateManager !== undefined ) {
      const orderContent = this.templateManager.getOrderTemplate( shoppingCart );
      const orderMessageTemplate = this.templateManager.getOrderMessageTemplate( orderContent );
      super.fileManager.ensureFolder( this.emailFolder );
      const orderFileName = this.getFileName( shoppingCart );
      super.fileManager.writeFile( { path: orderFileName, content: orderMessageTemplate } );
      super.logger.print( 'Sent Order: ' + shoppingCart.legalAmounts.invoiceNumber );
    }
  }
  private getFileName( shoppingCart: ShoppingCart ) {
    const customerCountry: string = shoppingCart.client.country;
    const warehouseEmailAddress = this.getWarehouseAddressByCountryTEMP( customerCountry );
    const orderFileName = `${this.orderPrefix}${
      shoppingCart.legalAmounts.invoiceNumber
    }_${warehouseEmailAddress}.txt`;
    const fileName = this.pathManager.join( this.emailFolder, orderFileName );
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
