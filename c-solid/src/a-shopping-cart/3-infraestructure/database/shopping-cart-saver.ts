import { Checker } from '../../../z-common/3-infraestructure/helper/checker';
import { PathManager } from '../../../z-common/3-infraestructure/helper/import/path-manager';
import { IManageFiles } from '../../../z-common/3-infraestructure/models/i-manage-files';
import { ShoppingCart } from '../models/shopping-cart';

export class ShoppingCartSaver {
  private readonly shoppingPrefix: string = `shopping-`;
  private readonly lastinvoiceFileName: string = `lastinvoice.txt`;
  private readonly pathManager = new PathManager();
  // private readonly fileManager: FileManager = new FileManager();
  private readonly checker = new Checker();

  constructor( private readonly fileManager: IManageFiles ) { }

  public loadFromStorage( shoppingCart: ShoppingCart ) {
    const shoppingFilePath = this.getShoppingFilePath( shoppingCart );
    shoppingCart.lineItems = this.getLinesFromFile( shoppingFilePath, [] );
  }
  public saveToStorage( shoppingCart: ShoppingCart ) {
    this.fileManager.ensureFolder( this.pathManager.dataFolder );
    const shoppingFilePath = this.getShoppingFilePath( shoppingCart );
    this.fileManager.writeFile( {
      path: shoppingFilePath,
      content: JSON.stringify( shoppingCart.lineItems )
    } );
  }
  public deleteFromStorage( shoppingCart: ShoppingCart ) {
    const shoppingFilePath = this.getShoppingFilePath( shoppingCart );
    this.fileManager.deleteFile( shoppingFilePath );
  }

  public writeLastInvoiceNumber( shoppingCart: ShoppingCart ) {
    const invoiceNumberFileName = this.pathManager.joinPaths(
      this.pathManager.dataFolder,
      this.lastinvoiceFileName
    );
    this.fileManager.writeFile( {
      path: invoiceNumberFileName,
      content: shoppingCart.legalAmounts.invoiceNumber.toString()
    } );
  }

  public readLastInvoiceNumber(): number {
    const invoiceNumberFileName = this.pathManager.joinPaths(
      this.pathManager.dataFolder,
      this.lastinvoiceFileName
    );
    let lastInvoiceNumber = 0;
    const fileContent = { path: invoiceNumberFileName, content: '0' };
    this.fileManager.readFile( fileContent );
    const readedValue = Number.parseInt( fileContent.content );
    if ( Number.isNaN( readedValue ) ) {
      lastInvoiceNumber = 0;
    } else {
      lastInvoiceNumber = readedValue;
    }
    return lastInvoiceNumber;
  }

  private getShoppingFilePath( shoppingCart: ShoppingCart ) {
    const shoppingFileName = `${this.shoppingPrefix}${shoppingCart.client.name}.json`;
    const shoppingFilePath = this.pathManager.joinPaths(
      this.pathManager.dataFolder,
      shoppingFileName
    );
    return shoppingFilePath;
  }

  private getLinesFromFile( shoppingFilePath: string, defaultValue: any ) {
    const fileContent = { path: shoppingFilePath, content: '' };
    this.fileManager.readFile( fileContent );
    if ( this.checker.hasStringContent( fileContent.content ) ) {
      return JSON.parse( fileContent.content );
    } else {
      return defaultValue;
    }
  }
}
