import { ShoppingCartManager } from '../src/shopping-cart-manager';
import { WarehouseAdministrator } from '../src/warehouse-administrator';
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

describe( `6- As a shop owner, I want to have my product stock refilled, so I can continue selling`, () => {
  assert = {
    given: 'a user that ordered certain amount',
    should: 'the stock is auto-refilled'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = WarehouseAdministrator.productCatalog[0].stock;
    assert.expected = mocks.PRODUCT_CATALOG[0].minimumStock;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
