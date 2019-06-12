export interface IManagePaths {
  readonly emailFolder: string;
  readonly printFolder: string;
  joinPaths( folderPath: string, fileName: string ): string;
  getBaseName( fullPath: string ): string;
}
