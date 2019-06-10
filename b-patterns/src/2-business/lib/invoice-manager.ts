import { InvoiceTemplateManager } from '../../3-infraestructure/helper/invoice-template-manager';
import { ShoppingCart } from '../../3-infraestructure/models/shopping-cart';
import { DocumentManager } from './document-manager';

export class InvoiceManager extends DocumentManager {
  protected getTemplateManager() {
    super.iTemplateManager = new InvoiceTemplateManager();
  }
  public send( shoppingCart: ShoppingCart ) {
    if ( super.iTemplateManager !== undefined ) {
      const invoiceTemplate = super.iTemplateManager.getTemplate( shoppingCart );
      this.print( shoppingCart, invoiceTemplate );
      this.sendEmail( shoppingCart.client.email, invoiceTemplate );
      this.logger.print( 'Sent Invoice: ' + shoppingCart.legalAmounts.invoiceNumber );
    }
  }

  private print( shoppingCart: ShoppingCart, documentContent: string ) {
    const fileName = `${this.invoicePrefix}${shoppingCart.legalAmounts.invoiceNumber}.txt`;
    super.Printer.printContentToFile( { fileName, textContent: documentContent } );
  }

  private sendEmail( emailAddress: string, invoiceContent: string ) {
    if ( super.iTemplateManager !== undefined ) {
      const invoiceMessageTemplate = super.iTemplateManager.getMessage( invoiceContent );
      super.fileManager.ensureFolder( super.emailFolder );
      const invoiceFileName = this.getFileName( emailAddress );
      super.fileManager.writeFile( { path: invoiceFileName, content: invoiceMessageTemplate } );
    }
  }
  private getFileName( emailAddress: string ) {
    const invoiceFileName = `${super.invoicePrefix}${emailAddress}.txt`;
    const fileName = super.pathManager.join( super.emailFolder, invoiceFileName );
    return fileName;
  }
}
