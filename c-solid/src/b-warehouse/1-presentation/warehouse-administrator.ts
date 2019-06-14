import { ToolsFacade } from '../../z-common/3-infrastructure/helper/tools-facade';
import { LineItem } from '../../z-common/3-infrastructure/models/line-item';
import { OrdersProcessor } from '../2-business/lib/orders-processor';
import { PRODUCT_CATALOG } from '../3-infrastructure/database/product-catalog';
import { Product } from '../3-infrastructure/models/product';

export class WarehouseAdministrator {
  public static productCatalog: Product[] = PRODUCT_CATALOG;
  private readonly restockPrefix = `restock-`;
  protected readonly toolsFacade = new ToolsFacade();
  protected readonly ordersProcessor = new OrdersProcessor();
  private stock: any[] = [];

  private static findProductByName( productName: string ) {
    return WarehouseAdministrator.productCatalog.find( product => product.name === productName );
  }

  public processOrders() {
    this.ordersProcessor.processOrders();
  }

  public addProduct() { }

  public updatePurchasedProduct( purchasedItem: LineItem ): number {
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
