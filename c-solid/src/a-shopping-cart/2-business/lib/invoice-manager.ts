import { InvoiceTemplateManager } from '../../3-infrastructure/helper/invoice-template-manager';
import { ShoppingCart } from '../../3-infrastructure/models/shopping-cart';
import { DocumentManager } from './document-manager';

export class InvoiceManager extends DocumentManager {
  constructor() {
    super();
  }
  protected setTemplateManager() {
    this.templateManager = new InvoiceTemplateManager();
  }
  public send( shoppingCart: ShoppingCart ) {
    if ( this.templateManager !== undefined ) {
      const invoiceTemplate = this.templateManager.getTemplate( shoppingCart );
      this.print( shoppingCart, invoiceTemplate );
      this.sendEmail( shoppingCart.client.email, invoiceTemplate );
      this.toolsFacade.printLog( 'Sent Invoice: ' + shoppingCart.legalAmounts.invoiceNumber );
    }
  }

  private print( shoppingCart: ShoppingCart, documentContent: string ) {
    const fileName = `${this.invoicePrefix}${shoppingCart.legalAmounts.invoiceNumber}.txt`;
    this.toolsFacade.printContentToFile( { fileName, textContent: documentContent } );
  }

  private sendEmail( emailAddress: string, invoiceContent: string ) {
    if ( this.templateManager !== undefined ) {
      const invoiceMessageTemplate = this.templateManager.getMessage( invoiceContent );
      this.toolsFacade.ensureFolder( this.emailFolder );
      const invoiceFileName = this.getFileName( emailAddress );
      this.toolsFacade.writeFile( { path: invoiceFileName, content: invoiceMessageTemplate } );
    }
  }
  private getFileName( emailAddress: string ) {
    const invoiceFileName = `${this.invoicePrefix}${emailAddress}.txt`;
    const fileName = this.toolsFacade.joinPaths( this.emailFolder, invoiceFileName );
    return fileName;
  }
}
