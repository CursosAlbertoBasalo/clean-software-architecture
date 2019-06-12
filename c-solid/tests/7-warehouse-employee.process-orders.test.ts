import * as fs from 'fs';
import { ShoppingCartManager } from '../src/1-presentation/shopping-cart-manager';
import { WarehouseAdministrator } from '../src/1-presentation/warehouse-administrator';
import * as filePaths from './helper/file-paths';
import * as mocks from './helper/mocks';
import { Assert } from './model/assert';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;

beforeAll( () => {
  filePaths.cleanTestData();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  shoppingCartManager.addLineItem( mocks.bigBuyer );
  shoppingCartManager.calculateCheckOut( mocks.checkOutInfo );
} );
afterAll( () => {
  filePaths.cleanTestData();
} );

describe( `7- As a warehouse employee, I want to process pending orders, so I can satisfy our customers`, () => {
  const shipmentFilePath = filePaths.shipmentFilePath( 1 );

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
