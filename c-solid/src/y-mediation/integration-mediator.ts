import { WarehouseAdministrator } from '../b-warehouse/1-presentation/warehouse-administrator';
import { LineItem } from '../z-common/3-infraestructure/models/line-item';
export class IntegrationMediator {
  public updatePurchasedProduct( purchasedItem: LineItem ): number {
    const warehouseAdministrator = new WarehouseAdministrator();
    return warehouseAdministrator.updatePurchasedProduct( purchasedItem );
  }
}
