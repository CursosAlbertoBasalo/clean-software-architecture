import { ShoppingCartManager } from '../src/shopping-cart-manager';
import * as mocks from './helper/mocks';
import { Assert } from './model/assert';

let assert: Assert;

describe( `1- As a customer, I want to add products to the shopping cart, so I can buy products`, () => {
  assert = {
    given: 'a client with no shopping cart',
    should: 'create one from client instance'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const shoppingCartManager = new ShoppingCartManager( mocks.client );
    assert.actual = shoppingCartManager.shoppingCart.client;
    assert.expected = mocks.client;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart',
    should: 'add products to it'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const shoppingCartManager = new ShoppingCartManager( mocks.client );
    shoppingCartManager.addLineItem( mocks.LINE_ITEMS[0] );
    assert.actual = shoppingCartManager.shoppingCart.lineItems[0];
    assert.expected = mocks.LINE_ITEMS[0];
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
