import * as fs from 'fs';
import { ShoppingCartManager } from '../src/shopping-cart-manager';
import { Assert } from './assert';
import * as mocks from './mocks';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;

beforeAll( () => {
  mocks.cleanTestData();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  mocks.LINE_ITEMS.forEach( lineItem => shoppingCartManager.addLineItem( lineItem ) );
  shoppingCartManager.calculateCheckOut( mocks.checkOutInfo );
} );
afterAll( () => {
  mocks.cleanTestData();
} );

describe( `4- As a shop owner, I want to generate invoices, so I can legally sell products`, () => {
  const invoiceFilePath = mocks.invoiceFilePath();
  const invoicePrintingFilePath = mocks.invoicePrintingFilePath( 1 );

  assert = {
    given: 'a shopping cart already ordered',
    should: `generate invoice and send to customer email address on ${invoiceFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCartManager.sendInvoiceToCustomer();
    assert.actual = fs.existsSync( invoiceFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart already ordered',
    should: `print invoice on ${invoicePrintingFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = fs.existsSync( invoicePrintingFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
