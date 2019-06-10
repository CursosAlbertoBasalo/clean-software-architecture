export interface TaxBaseInfo {
  base : number;
  country : string;
  region : string;
  isStudent : boolean;
  isATaxFreeProduct : boolean | undefined;
}
