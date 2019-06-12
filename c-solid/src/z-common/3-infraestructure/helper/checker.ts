export class Checker {
  public hasStringContent( content: string | undefined | null ): boolean {
    return content !== undefined && content !== null && content.length > 0;
  }

  public findSafe(
    target: any[],
    predicate: ( item: any ) => boolean,
    defaultValue: any = target[0]
  ): any {
    const foundItem = target.find( predicate );
    if ( foundItem === undefined ) {
      return defaultValue;
    }
    return foundItem;
  }
}
