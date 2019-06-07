import * as fs from 'fs';
import { ShoppingCartManager } from '../src/shopping-cart';
import { Assert } from './assert';
import * as mocks from './mocks';

let assert: Assert;
let shoppingCartManager: ShoppingCartManager;
beforeAll( () => {
  mocks.cleanShoppingCart();
  shoppingCartManager = new ShoppingCartManager( mocks.client );
  shoppingCartManager.addLineItem( mocks.LINE_ITEMS[0] );
} );
afterAll( () => {
  mocks.cleanShoppingCart();
} );

describe( `2- As a customer, I want to save and restore my current shopping cart, so I can continue later`, () => {
  assert = {
    given: 'a shopping cart',
    should: `save it on ${mocks.shoppingCartFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCartManager.saveToStorage();
    assert.actual = fs.existsSync( mocks.shoppingCartFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a saved shopping cart',
    should: 'restore it'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCartManager.loadFromStorage();
    assert.actual = shoppingCartManager.shoppingCart.lineItems.length;
    assert.expected = 1;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
