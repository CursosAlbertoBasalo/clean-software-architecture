import * as fs from 'fs';
import * as path from 'path';
import { client } from './mocks';

const dataFolder = path.join( __dirname, '../..', 'data' );
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

export const cleanTestData = () => rimraf( dataFolder );

function rimraf( dirPath: string ) {
  if ( fs.existsSync( dirPath ) ) {
    fs.readdirSync( dirPath ).forEach( function( entry ) {
      var entryPath = path.join( dirPath, entry );
      if ( fs.lstatSync( entryPath ).isDirectory() ) {
        rimraf( entryPath );
      } else {
        try {
          fs.unlinkSync( entryPath );
        } catch ( error ) { }
      }
    } );
    try {
      fs.rmdirSync( dirPath );
    } catch ( error ) {
      rimraf( dirPath );
    }
  }
}
