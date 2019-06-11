import { FileContent } from '../models/file-content';
import { FileToPrint } from '../models/file-to-print';
import { Checker } from './checker';
import { FileManager } from './import/file-manager';
import { PathManager } from './import/path-manager';
import { Logger } from './logger';
import { Printer } from './printer';

export class ToolsFacade {
  private readonly checker = new Checker();
  private readonly logger = new Logger();
  private readonly fileManager = new FileManager();
  private readonly pathManager = new PathManager();
  public readonly emailFolder = this.pathManager.emailFolder;
  public readonly printFolder = this.pathManager.printFolder;

  public printContentToFile( fileToPrint: FileToPrint ) {
    Printer.printContentToFile( fileToPrint );
  }

  public printLog( logContent: string ) {
    this.logger.print( logContent );
  }

  public joinPaths( folderPath: string, fileName: string ) {
    return this.pathManager.join( folderPath, fileName );
  }
  public getBaseName( fullPath: string ) {
    return this.pathManager.baseName( fullPath );
  }

  public writeFile( fileContent: FileContent ) {
    this.fileManager.writeFile( fileContent );
  }

  public appendFile( fileContent: FileContent ) {
    this.fileManager.appendFile( fileContent );
  }

  public readFile( fileContent: FileContent ) {
    this.fileManager.readFile( fileContent );
  }

  public deleteFile( filePath: string ) {
    this.fileManager.deleteFile( filePath );
  }

  public renameFile( oldPath: string, newName: string ) {
    this.fileManager.renameFile( oldPath, newName );
  }

  public ensureFolder( folderPath: string ) {
    this.fileManager.ensureFolder( folderPath );
  }

  public readFolderFileList( folderPath: string ): string[] {
    return this.fileManager.readFolderFileList( folderPath );
  }
  public hasStringContent( content: string | undefined | null ): boolean {
    return this.checker.hasStringContent( content );
  }

  public findSafe(
    target: any[],
    predicate: ( item: any ) => boolean,
    defaultValue: any = target[0]
  ): any {
    return this.checker.findSafe( target, predicate, defaultValue );
  }
}
