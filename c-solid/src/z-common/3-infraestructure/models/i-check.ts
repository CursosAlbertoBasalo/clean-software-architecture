export interface ICheck {
  hasStringContent( content: string | undefined | null ): boolean;
  findSafe( target: any[], predicate: ( item: any ) => boolean, defaultValue?: any ): any;
}
