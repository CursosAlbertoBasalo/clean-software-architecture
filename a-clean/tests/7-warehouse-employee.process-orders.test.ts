import * as fs from 'fs';
import { ShoppingCartManager } from '../src/shopping-cart-manager';
import { WarehouseAdministrator } from '../src/warehouse-administrator';
import { Assert } from './assert';
import * as mocks from './mocks';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;

beforeAll( () => {
  mocks.cleanTestData();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  shoppingCartManager.addLineItem( mocks.bigBuyer );
  shoppingCartManager.calculateCheckOut( mocks.checkOutInfo );
} );
afterAll( () => {
  mocks.cleanTestData();
} );

describe( `7- As a warehouse employee, I want to process pending orders, so I can satisfy our customers`, () => {
  const shipmentFilePath = mocks.shipmentFilePath( 1 );

  assert = {
    given: 'an pending order',
    should: `process it and create a shipment ${shipmentFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    new WarehouseAdministrator().processOrders();
    assert.actual = fs.existsSync( shipmentFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
