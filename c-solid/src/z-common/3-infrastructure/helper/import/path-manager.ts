import * as path from 'path';
import * as paths from '../../database/config/path-configurations';
import { IManagePaths } from '../../models/i-manage-paths';

export class PathManager implements IManagePaths {
  public dataFolder = path.join( __dirname, paths.rootRelativePath, 'data' );
  public emailFolder = path.join( this.dataFolder, 'email' );
  public printFolder = path.join( this.dataFolder, 'print' );

  public joinPaths( folderPath: string, fileName: string ): string {
    return path.join( folderPath, fileName );
  }
  public getBaseName( fullPath: string ): string {
    return path.basename( fullPath );
  }
}
