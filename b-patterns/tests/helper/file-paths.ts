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
  if ( tryExists( dirPath ) ) {
    const dirEntries = tryReadDir( dirPath );
    dirEntries.forEach( function( entry ) {
      const entryPath = path.join( dirPath, entry );
      const stats = tryGetStatus( entryPath );
      if ( stats && stats.isDirectory() ) {
        rimraf( entryPath );
      } else {
        tryDelete( entryPath );
      }
    } );
    tryDeleteDir( dirPath );
  }
}

function tryDeleteDir( dirPath: string ) {
  try {
    fs.rmdirSync( dirPath );
  } catch ( error ) {
    rimraf( dirPath );
  }
}

function tryExists( path: string ): boolean {
  try {
    return fs.existsSync( path );
  } catch ( error ) {
    return false;
  }
}
function tryReadDir( path: string ): string[] {
  try {
    return fs.readdirSync( path );
  } catch ( error ) {
    return [];
  }
}
function tryGetStatus( path: string ) {
  try {
    return fs.lstatSync( path );
  } catch ( error ) {
    return false;
  }
}
function tryDelete( entryPath: string ) {
  try {
    fs.unlinkSync( entryPath );
  } catch ( error ) { }
}
