import { PRODUCT_CATALOG } from './database/product-catalog';
import { Logger } from './helper/logger';
import { Printer } from './helper/printer';
import { FileManager } from './import/file-manager';
import { PathManager } from './import/path-manager';
import { LineItem } from './models/line-item';
import { Product } from './models/product';

export class WarehouseAdministrator {
  private static productCatalog : Product[] = PRODUCT_CATALOG;
  private readonly shipmentPrefix = `shipment-`;
  private readonly orderPrefix = `order-`;
  private readonly restockPrefix = `restock-`;
  private readonly fileManager = new FileManager();
  private readonly pathManager = new PathManager();
  private readonly logger = new Logger();
  private stock : any[] = [];

  private static findProductByName( productName : string ) {
    return WarehouseAdministrator.productCatalog.find( product => product.name === productName );
  }

  public processOrders() {
    const ordersFolder = this.getOrdersFolder();
    this.processOrdesFolder( ordersFolder );
  }

  public addProduct() { }

  public updatePurchasedProduct( purchasedItem : LineItem ) {
    const purchasedProduct = WarehouseAdministrator.findProductByName( purchasedItem.productName );
    if ( purchasedProduct !== undefined ) {
      let realPurchasedQuantity = this.getRealPurchasedQuantity( purchasedProduct, purchasedItem.quantity );
      this.updateStock( purchasedProduct, realPurchasedQuantity );
      return realPurchasedQuantity;
    } else {
      return 0;
    }
  }

  private getOrdersFolder() {
    return this.pathManager.emailFolder;
  }

  private processOrdesFolder( ordersFolder : string ) {
    this.fileManager.readFolderFileList( ordersFolder ).forEach( fileName => {
      this.processFileInOrderFolder( fileName, ordersFolder );
    } );
  }

  private processFileInOrderFolder( fileName : string, ordersFolder : string ) {
    if ( this.isAnOrderFile( fileName ) ) {
      this.processOrder( fileName, ordersFolder );
    }
  }

  private processOrder( orderFileName : string, ordersFolder : string ) {
    const shippmentFileName = orderFileName.replace( this.orderPrefix, this.shipmentPrefix );
    this.fileManager.renameFile(
      this.pathManager.join( ordersFolder, orderFileName ),
      this.pathManager.join( ordersFolder, shippmentFileName )
    );
    this.logger.print( 'processed: ' + orderFileName );
  }

  private isAnOrderFile( orderFileName : string ) {
    return this.pathManager.baseName( orderFileName ).startsWith( this.orderPrefix );
  }

  private getRealPurchasedQuantity( purchasedProduct : Product, quantity : number ) {
    let realPurchasedQuantity = quantity;
    if ( this.isNotEnouht( purchasedProduct, quantity ) ) {
      this.logger.print( 'not have enough: ' + purchasedProduct.name );
      realPurchasedQuantity = purchasedProduct.stock;
    }
    return realPurchasedQuantity;
  }

  private updateStock( purchasedProduct : any, realPurchasedQuantity : number ) {
    purchasedProduct.stock = purchasedProduct.stock - realPurchasedQuantity;
    if ( this.isOutOfStock( purchasedProduct ) ) {
      this.restockProduct( purchasedProduct );
    }
    return realPurchasedQuantity;
  }

  private isNotEnouht( purchasedProduct : Product, quantity : number ) {
    return purchasedProduct.stock <= quantity;
  }

  private isOutOfStock( purchasedProduct : Product ) {
    return purchasedProduct.stock < purchasedProduct.minimumStock;
  }

  private restockProduct( productToRestoc : Product ) {
    productToRestoc.stock = productToRestoc.minimumStock;
    const fileToPrint = {
      fileName: this.restockPrefix + productToRestoc.name + '.json',
      textContent: JSON.stringify( productToRestoc )
    };
    Printer.printContentToFile( fileToPrint );
  }
}
