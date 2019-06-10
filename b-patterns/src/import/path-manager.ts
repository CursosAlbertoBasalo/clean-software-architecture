import * as path from 'path';
export class PathManager {
  public dataFolder = path.join( __dirname, '../..', 'data' );
  public emailFolder = path.join( this.dataFolder, 'email' );
  public printFolder = path.join( this.dataFolder, 'print' );

  public join( folderPath : string, fileName : string ) {
    return path.join( folderPath, fileName );
  }
  public baseName( fullPath : string ) {
    return path.basename( fullPath );
  }
}
