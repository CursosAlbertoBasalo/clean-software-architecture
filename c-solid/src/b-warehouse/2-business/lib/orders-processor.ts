import { ToolsFacade } from '../../../z-common/3-infraestructure/helper/tools-facade';
import { ILogger } from '../../../z-common/3-infraestructure/models/i-logger';
import { IManageFiles } from '../../../z-common/3-infraestructure/models/i-manage-files';
import { IManagePaths } from '../../../z-common/3-infraestructure/models/i-manage-paths';

export class OrdersProcessor {
  protected readonly toolsFacade: IManageFiles & IManagePaths & ILogger = new ToolsFacade();
  private readonly shipmentPrefix = `shipment-`;
  private readonly orderPrefix = `order-`;

  public processOrders() {
    const ordersFolder = this.getOrdersFolder();
    this.processOrdesFolder( ordersFolder );
  }
  private getOrdersFolder() {
    return this.toolsFacade.emailFolder;
  }
  private processOrdesFolder( ordersFolder: string ) {
    this.toolsFacade.readFolderFileList( ordersFolder ).forEach( ( fileName: string ) => {
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
}
