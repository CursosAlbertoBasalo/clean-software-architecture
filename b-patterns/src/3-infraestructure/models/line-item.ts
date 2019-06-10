export interface LineItem {
  productName : string;
  quantity : number;
  price : number;
  country? : string;
  taxFree? : boolean;
  amount : number;
  taxes : number;
}
