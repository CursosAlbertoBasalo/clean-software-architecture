import * as path from 'path';
import * as paths from '../database/config/path-configurations';

export class PathManager {
  public dataFolder = path.join( __dirname, paths.rootRelativePath, 'data' );

  public emailFolder = path.join( this.dataFolder, 'email' );
  public printFolder = path.join( this.dataFolder, 'print' );

  public join( folderPath: string, fileName: string ) {
    return path.join( folderPath, fileName );
  }
  public baseName( fullPath: string ) {
    return path.basename( fullPath );
  }
}
