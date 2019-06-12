import { WarehouseAdministrator } from '../b-warehouse/1-presentation/warehouse-administrator';
import { LineItem } from '../z-common/3-infraestructure/models/line-item';
export class IntegrationMediator {
  private readonly warehouseAdministrator = new WarehouseAdministrator();

  public updatePurchasedProduct( purchasedItem: LineItem ): number {
    return this.warehouseAdministrator.updatePurchasedProduct( purchasedItem );
  }
}
