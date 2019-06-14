import { FileManager } from '../../../z-common/3-infrastructure/helper/import/file-manager';
import { IManageFiles } from '../../../z-common/3-infrastructure/models/i-manage-files';
export class ManageFilesFactory {
  public createInstance(): IManageFiles {
    if ( true ) {
      return new FileManager();
    }
  }
}
