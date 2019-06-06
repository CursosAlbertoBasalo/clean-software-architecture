import * as fs from 'fs';
import { FileContent } from '../models/file-content';

export class FileManager {
  public writeFile( fileContent : FileContent ) {
    if ( this.notExistsFile( fileContent ) ) {
      fs.writeFileSync( fileContent.path, fileContent.content );
    }
  }

  public appendFile( fileContent : FileContent ) {
    if ( this.notExistsFile( fileContent ) ) {
      fs.writeFileSync( fileContent.path, fileContent.content );
    } else {
      fs.appendFileSync( fileContent.path, fileContent.content );
    }
  }

  public readFile( fileContent : FileContent ) {
    fileContent.content = '';
    if ( this.existsFile( fileContent ) ) {
      try {
        fileContent.content = fs.readFileSync( fileContent.path, 'utf8' );
      } catch ( error ) { }
    }
  }

  public deleteFile( filePath : string ) {
    if ( this.existsPath( filePath ) ) {
      fs.unlinkSync( filePath );
    }
  }

  public renameFile( oldPath : string, newName : string ) {
    fs.renameSync( oldPath, newName );
  }

  public ensureFolder( folderPath : string ) {
    if ( this.notExistsPath( folderPath ) ) {
      fs.mkdirSync( folderPath );
    }
  }

  public readFolderFileList( folderPath : string ) {
    if ( this.existsPath( folderPath ) ) {
      return fs.readdirSync( folderPath );
    } else {
      return [];
    }
  }

  private existsPath( filePath : string ) : boolean {
    return fs.existsSync( filePath );
  }
  private notExistsPath( filePath : string ) : boolean {
    return !this.existsPath( filePath );
  }
  private existsFile( fileContent : FileContent ) : boolean {
    return this.existsPath( fileContent.path );
  }
  private notExistsFile( fileContent : FileContent ) : boolean {
    return !this.existsFile( fileContent );
  }
}
