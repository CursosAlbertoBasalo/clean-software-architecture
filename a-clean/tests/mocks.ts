import * as fs from 'fs';
import * as path from 'path';
import { LineItem } from '../src/models/line-item';
import { Product } from '../src/models/product';
import { WarehouseAdministrator } from '../src/warehouse-administrator';

export const client = {
  name: 'Alberto',
  isStudent: false,
  region: 'Galicia',
  country: 'Spain',
  email: 'alberto@code.dev',
  isVip: true,
  taxNumber: 'A12345678'
};

export const checkOutInfo = {
  paymentMethod: 'PayPal',
  paymentId: 'x-le/159',
  shippingAddress: 'One Street',
  billingAddress: 'Corp. Building'
};

export const LINE_ITEMS: LineItem[] = [
  {
    productName: 'computer',
    quantity: 1,
    price: 1000,
    country: client.country,
    taxFree: false,
    amount: 0,
    taxes: 0
  },
  {
    productName: 'monitor',
    quantity: 25,
    price: 200,
    country: client.country,
    taxFree: false,
    amount: 0,
    taxes: 0
  },
  {
    productName: 'course',
    quantity: 10,
    price: 100,
    country: client.country,
    taxFree: true,
    amount: 0,
    taxes: 0
  }
];

export const PRODUCT_CATALOG: Product[] = [
  {
    name: 'monitor',
    price: 1000,
    stock: 50,
    minimumStock: 20,
    isTaxFree: false
  },
  {
    name: 'computer',
    price: 200,
    stock: 20,
    minimumStock: 3,
    isTaxFree: false
  },
  {
    name: 'printer',
    price: 1000,
    stock: 10,
    minimumStock: 5,
    isTaxFree: false
  },
  {
    name: 'course',
    price: 100,
    stock: 1000000,
    minimumStock: 1000000,
    isTaxFree: true
  }
];

// To review
export const theWarehouse = WarehouseAdministrator;
export const oneWarehouse = new WarehouseAdministrator();

export const shoppingCart = {
  client: client,
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

export const shoppingCartFilePath = path.join(
  dataFolder,
  `shopping-${shoppingCart.client.name}.json`
);

export const orderFilePath = ( invoiceNumber: number ) =>
  path.join( emailFolder, `order-${invoiceNumber}_warehouse@acme.es.txt` );

export const shipmentFilePath = ( invoiceNumber: number ) =>
  path.join( emailFolder, `shipment-${invoiceNumber}_warehouse@acme.es.txt` );

export const invoiceFilePath = () =>
  path.join( emailFolder, `invoice-${shoppingCart.client.email}.txt` );

export const invoicePrintingFilePath = ( invoiceNumber: number ) =>
  path.join( printFolder, `invoice-${invoiceNumber}.txt` );

export function cleanShoppingCart() {
  cleanPath( shoppingCartFilePath );
}

export function cleanCheckOuts() {
  rimraf( emailFolder );
  rimraf( printFolder );
}

export function cleanTestData() {
  rimraf( dataFolder );
}

function cleanPath( path: string ) {
  if ( fs.existsSync( shoppingCartFilePath ) ) {
    if ( fs.lstatSync( path ).isDirectory() ) {
      rimraf( path );
    } else {
      deleteFile( path );
    }
  }
}

function rimraf( dirPath: string ) {
  if ( fs.existsSync( dirPath ) ) {
    fs.readdirSync( dirPath ).forEach( function( entry ) {
      var entryPath = path.join( dirPath, entry );
      if ( fs.lstatSync( entryPath ).isDirectory() ) {
        rimraf( entryPath );
      } else {
        deleteFile( entryPath );
      }
    } );
    deleteDir( dirPath );
  }
}

function deleteDir( dirPath: string ) {
  try {
    fs.rmdirSync( dirPath );
  } catch ( error ) {
    rimraf( dirPath );
  }
}

function deleteFile( filePath: string ) {
  try {
    fs.unlinkSync( filePath );
  } catch ( error ) { }
}
