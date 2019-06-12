import * as fs from 'fs';
import { ShoppingCartManager } from '../src/a-shopping-cart/1-presentation/shopping-cart-manager';
import * as filePaths from './helper/file-paths';
import * as mocks from './helper/mocks';
import { Assert } from './model/assert';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;

beforeAll( () => {
  filePaths.cleanTestData();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  mocks.LINE_ITEMS.forEach( lineItem => shoppingCartManager.addLineItem( lineItem ) );
  shoppingCartManager.calculateCheckOut( mocks.checkOutInfo );
} );
afterAll( () => {
  filePaths.cleanTestData();
} );

describe( `5- As a shop owner, I want to generate orders, so I can send products to customers`, () => {
  const orderFilePath = filePaths.orderFilePath( 1 );

  assert = {
    given: 'a shopping cart with line items',
    should: `generate order after checkout in ${orderFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = fs.existsSync( orderFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
