import * as fs from 'fs';
import * as path from 'path';
import { LineItem } from '../src/models/line-item';
import { Product } from '../src/models/product';

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

export const bigBuyer: LineItem = {
  productName: 'monitor',
  quantity: 40,
  price: 200,
  country: client.country,
  taxFree: false,
  amount: 0,
  taxes: 0
};

// To review

const dataFolder = path.join( __dirname, '..', 'data' );
const emailFolder = path.join( dataFolder, 'email' );
const printFolder = path.join( dataFolder, 'print' );

export const shoppingCartFilePath = path.join( dataFolder, `shopping-${client.name}.json` );

export const orderFilePath = ( invoiceNumber: number ) =>
  path.join( emailFolder, `order-${invoiceNumber}_warehouse@acme.es.txt` );

export const shipmentFilePath = ( invoiceNumber: number ) =>
  path.join( emailFolder, `shipment-${invoiceNumber}_warehouse@acme.es.txt` );

export const invoiceFilePath = () => path.join( emailFolder, `invoice-${client.email}.txt` );

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
