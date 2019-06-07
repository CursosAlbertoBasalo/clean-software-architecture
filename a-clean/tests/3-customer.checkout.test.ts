import { ShoppingCartManager } from '../src/shopping-cart-manager';
import { Assert } from './assert';
import * as mocks from './mocks';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;

beforeAll( () => {
  mocks.cleanTestData();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  mocks.LINE_ITEMS.forEach( lineItem => shoppingCartManager.addLineItem( lineItem ) );
} );
afterAll( () => {
  mocks.cleanTestData();
} );

describe( `As a customer, I want to check out, so I can pay and get the products`, () => {
  assert = {
    given: 'a shopping cart',
    should: 'calculate check out'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const expectedTotal = 6615;
    shoppingCartManager.calculateCheckOut( mocks.checkOutInfo );
    assert.actual = shoppingCartManager.shoppingCart.legalAmounts.total;
    assert.expected = expectedTotal;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart',
    should: 'have an invoice number'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = shoppingCartManager.shoppingCart.legalAmounts.invoiceNumber;
    assert.expected = 0;
    expect( assert.actual ).toBeGreaterThan( assert.expected );
  } );
} );
