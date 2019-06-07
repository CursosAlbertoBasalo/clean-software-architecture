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

describe( `As a shop owner, I want to generate orders, so I can send products to customers`, () => {
  const orderFilePath = mocks.orderFilePath( 1 );

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
