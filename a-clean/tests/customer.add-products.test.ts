import { Assert } from './assert';
import * as mocks from './mocks';

describe( `As a customer, I want to add products to the shopping cart, so I can buy products`, () => {
  let assert : Assert;

  assert = {
    given: 'no shopping cart',
    should: 'create one'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = mocks.newShoppingCart;
    assert.expected = mocks.newShoppingCart;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart',
    should: 'add products to it'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const mySC = mocks.newShoppingCart;
    const price = 1000;
    mySC.addLineItem( { productName: 'computer', price: price, quantity: 1, country: mySC.client.country, amount: 0, taxes: 0 } );
    assert.actual = mySC.lineItems;
    assert.expected = [
      { price: 1000, productName: 'computer', quantity: 1, country: mySC.client.country, amount: 0, taxes: 0 }
    ];
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
