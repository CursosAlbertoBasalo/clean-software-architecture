import { FileManager } from '../../../z-common/3-infraestructure/helper/import/file-manager';
import { IManageFiles } from '../../../z-common/3-infraestructure/models/i-manage-files';
export class ManageFilesFactory {
  public createInstance(): IManageFiles {
    if ( true ) {
      return new FileManager();
    }
  }
}
