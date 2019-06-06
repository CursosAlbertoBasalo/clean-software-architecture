import { CountryTaxNode } from '../../models/country-tax-node';

export const LOCAL_TAXES_TREE : CountryTaxNode[] = [
  {
    name: '*default*',
    localVAT: 0,
    regionTaxes: [
      {
        name: '*default*',
        localVAT: 0
      }
    ]
  },
  {
    name: 'Spain',
    localVAT: 21,
    regionTaxes: [
      {
        name: 'Canary Islands',
        localVAT: 7
      }
    ]
  },
  {
    name: 'Portugal',
    localVAT: 23,
    regionTaxes: [
      {
        name: 'Madeira',
        localVAT: 22
      },
      {
        name: 'Azores',
        localVAT: 18
      }
    ]
  },
  {
    name: 'France',
    localVAT: 20,
    regionTaxes: []
  }
];
