import * as fs from 'fs';
import { Assert } from './assert';
import * as mocks from './mocks';

beforeAll( () => {
  // mocks.cleanShoppingCart();
} );
afterAll( () => {
  // mocks.cleanShoppingCart();
} );

describe( `As a customer, I want to save and restore my current shopping cart, so I can continue later`, () => {
  let assert : Assert;
  const shoppingCart = mocks.newShoppingCart;
  shoppingCart.addLineItem( 'computer', 1000, 1, shoppingCart.country );

  assert = {
    given: 'a shopping cart',
    should: `save it on ${mocks.shoppingCartFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCart.saveToStorage();
    assert.actual = fs.existsSync( mocks.shoppingCartFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a saved shopping cart',
    should: 'restore it'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCart.loadFromStorage();
    assert.actual = shoppingCart.lineItems.length;
    assert.expected = 1;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
