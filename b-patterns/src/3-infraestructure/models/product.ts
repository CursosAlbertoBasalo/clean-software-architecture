export class Product {
  constructor(
    public name : string,
    public price : number,
    public stock : number,
    public minimumStock : number,
    public isTaxFree : boolean
  ) { }
}
