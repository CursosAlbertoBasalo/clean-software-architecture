import * as fs from 'fs';
import * as path from 'path';
import { ShoppingCartManager } from '../src/shopping-cart';
import { WarehouseAdministrator } from '../src/warehouse-administrator';

export const newShoppingCart = new ShoppingCartManager( {
  name: 'Alberto',
  isStudent: false,
  region: 'Galicia',
  country: 'Spain',
  email: 'alberto@code.dev',
  isVip: true,
  taxNumber: 'A12345678'
} );

export const theWarehouse = WarehouseAdministrator;
export const oneWarehouse = new WarehouseAdministrator();

export const shoppingCart = {
  client: {
    name: 'Alberto',
    isStudent: false,
    region: 'Galicia',
    country: 'Spain',
    email: 'alberto@code.dev',
    isVip: true,
    taxNumber: 'A12345678'
  },
  shoppingPrefix: 'shopping-',
  lastinvoiceFileName: 'lastinvoice.txt',
  lineItems: [],
  checkOut: {
    paymentMethod: '',
    paymentId: '',
    shippingAddress: '',
    billingAddress: ''
  },
  legalAmounts: {
    total: 0,
    shippingCost: 0,
    taxes: 0,
    invoiceNumber: 0
  },
  documentManager: {
    countryConfigurations: [
      {
        countryName: '*default*',
        thresholdForDiscount: Infinity,
        shippingCost: [
          {
            upTo: 100,
            factor: 0.25,
            plus: 0
          },
          {
            upTo: 1000,
            factor: 0,
            plus: 25
          },
          {
            upTo: Infinity,
            factor: 0,
            plus: 20
          }
        ],
        warehouseAddress: 'warehouse@acme.com'
      },
      {
        countryName: 'Spain',
        thresholdForDiscount: 1000,
        shippingCost: [
          {
            upTo: 100,
            factor: 0.1,
            plus: 0
          },
          {
            upTo: 1000,
            factor: 0,
            plus: 10
          },
          {
            upTo: Infinity,
            factor: 0,
            plus: 0
          }
        ],
        warehouseAddress: 'warehouse@acme.es'
      },
      {
        countryName: 'Portugal',
        thresholdForDiscount: 3000,
        shippingCost: [
          {
            upTo: 100,
            factor: 0.15,
            plus: 0
          },
          {
            upTo: 1000,
            factor: 0,
            plus: 15
          },
          {
            upTo: Infinity,
            factor: 0,
            plus: 10
          }
        ],
        warehouseAddress: 'warehouse@acme.com'
      },
      {
        countryName: 'France',
        thresholdForDiscount: 2000,
        shippingCost: [
          {
            upTo: 100,
            factor: 0.2,
            plus: 0
          },
          {
            upTo: 1000,
            factor: 0,
            plus: 20
          },
          {
            upTo: Infinity,
            factor: 0,
            plus: 15
          }
        ],
        warehouseAddress: 'warehouse@acme.com'
      }
    ],
    logFileName: 'log.txt',
    emailFolder: 'C://Users/alber/code/atomic/clean-code/6-data/data/email',
    invoicePrefix: 'invoice-',
    orderPrefix: 'order-'
  }
};

const dataFolder = path.join( __dirname, '..', 'data' );
const emailFolder = path.join( dataFolder, 'email' );
const printFolder = path.join( dataFolder, 'print' );

export const shoppingCartFilePath = path.join( dataFolder, `shopping-${shoppingCart.client.name}.json` );

export const orderFilePath = ( invoiceNumber : number ) => path.join( emailFolder, `order-${invoiceNumber}_warehouse@acme.es.txt` );

export const shipmentFilePath = ( invoiceNumber : number ) =>
  path.join( emailFolder, `shipment-${invoiceNumber}_warehouse@acme.es.txt` );

export const invoiceFilePath = () => path.join( emailFolder, `invoice-${shoppingCart.client.email}.txt` );

export const invoicePrintingFilePath = ( invoiceNumber : number ) => path.join( printFolder, `invoice-${invoiceNumber}.txt` );

export function cleanShoppingCart() {
  if ( fs.existsSync( shoppingCartFilePath ) ) {
    rimraf( shoppingCartFilePath );
  }
}

export function cleanCheckOuts() {
  rimraf( emailFolder );
  rimraf( printFolder );
}

function rimraf( dirPath : string ) {
  if ( fs.existsSync( dirPath ) ) {
    fs.readdirSync( dirPath ).forEach( function( entry ) {
      var entryPath = path.join( dirPath, entry );
      if ( fs.lstatSync( entryPath ).isDirectory() ) {
        rimraf( entryPath );
      } else {
        try {
          // fs.unlinkSync( entryPath );
        } catch ( error ) { }
      }
    } );
    try {
      // fs.rmdirSync( dirPath );
    } catch ( error ) {
      rimraf( dirPath );
    }
  }
}
