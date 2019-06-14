import { PRODUCT_CATALOG } from '../3-infrastructure/database/product-catalog';
import { ToolsFacade } from '../3-infrastructure/helper/tools-facade';
import { LineItem } from '../3-infrastructure/models/line-item';
import { Product } from '../3-infrastructure/models/product';

export class WarehouseAdministrator {
  public static productCatalog: Product[] = PRODUCT_CATALOG;
  private readonly shipmentPrefix = `shipment-`;
  private readonly orderPrefix = `order-`;
  private readonly restockPrefix = `restock-`;
  protected readonly toolsFacade = new ToolsFacade();
  private stock: any[] = [];

  private static findProductByName( productName: string ) {
    return WarehouseAdministrator.productCatalog.find( product => product.name === productName );
  }

  public processOrders() {
    const ordersFolder = this.getOrdersFolder();
    this.processOrdesFolder( ordersFolder );
  }

  public addProduct() { }

  public updatePurchasedProduct( purchasedItem: LineItem ) {
    const purchasedProduct = WarehouseAdministrator.findProductByName(
      purchasedItem.productName
    );
    if ( purchasedProduct !== undefined ) {
      let realPurchasedQuantity = this.getRealPurchasedQuantity(
        purchasedProduct,
        purchasedItem.quantity
      );
      this.updateStock( purchasedProduct, realPurchasedQuantity );
      return realPurchasedQuantity;
    } else {
      return 0;
    }
  }

  private getOrdersFolder() {
    return this.toolsFacade.emailFolder;
  }

  private processOrdesFolder( ordersFolder: string ) {
    this.toolsFacade.readFolderFileList( ordersFolder ).forEach( fileName => {
      this.processFileInOrderFolder( fileName, ordersFolder );
    } );
  }

  private processFileInOrderFolder( fileName: string, ordersFolder: string ) {
    if ( this.isAnOrderFile( fileName ) ) {
      this.processOrder( fileName, ordersFolder );
    }
  }

  private processOrder( orderFileName: string, ordersFolder: string ) {
    const shippmentFileName = orderFileName.replace( this.orderPrefix, this.shipmentPrefix );
    this.toolsFacade.renameFile(
      this.toolsFacade.joinPaths( ordersFolder, orderFileName ),
      this.toolsFacade.joinPaths( ordersFolder, shippmentFileName )
    );
    this.toolsFacade.printLog( 'processed: ' + orderFileName );
  }

  private isAnOrderFile( orderFileName: string ) {
    return this.toolsFacade.getBaseName( orderFileName ).startsWith( this.orderPrefix );
  }

  private getRealPurchasedQuantity( purchasedProduct: Product, quantity: number ) {
    let realPurchasedQuantity = quantity;
    if ( this.isNotEnouht( purchasedProduct, quantity ) ) {
      this.toolsFacade.printLog( 'not have enough: ' + purchasedProduct.name );
      realPurchasedQuantity = purchasedProduct.stock;
    }
    return realPurchasedQuantity;
  }

  private updateStock( purchasedProduct: any, realPurchasedQuantity: number ) {
    purchasedProduct.stock = purchasedProduct.stock - realPurchasedQuantity;
    if ( this.isOutOfStock( purchasedProduct ) ) {
      this.restockProduct( purchasedProduct );
    }
    return realPurchasedQuantity;
  }

  private isNotEnouht( purchasedProduct: Product, quantity: number ) {
    return purchasedProduct.stock <= quantity;
  }

  private isOutOfStock( purchasedProduct: Product ) {
    return purchasedProduct.stock < purchasedProduct.minimumStock;
  }

  private restockProduct( productToRestoc: Product ) {
    productToRestoc.stock = productToRestoc.minimumStock;
    const fileToPrint = {
      fileName: this.restockPrefix + productToRestoc.name + '.json',
      textContent: JSON.stringify( productToRestoc )
    };
    this.toolsFacade.printContentToFile( fileToPrint );
  }
}
