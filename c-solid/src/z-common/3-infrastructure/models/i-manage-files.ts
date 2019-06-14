import { FileContent } from './file-content';
export interface IManageFiles {
  writeFile( fileContent: FileContent ): void;
  appendFile( fileContent: FileContent ): void;
  readFile( fileContent: FileContent ): void;
  deleteFile( filePath: string ): void;
  renameFile( oldPath: string, newName: string ): void;
  ensureFolder( folderPath: string ): void;
  readFolderFileList( folderPath: string ): string[];
}
