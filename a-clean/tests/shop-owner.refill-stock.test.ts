import { Assert } from './assert';
import * as mocks from './mocks';

afterAll( () => {
  mocks.cleanCheckOuts();
} );

describe( `As a shop owner, I want to have my product stock refilled, so I can continue selling`, () => {
  let assert : Assert;

  assert = {
    given: 'a user order certain amount',
    should: 'the stock is auto-refilled'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const shoppingCart = mocks.newShoppingCart;
    shoppingCart.addLineItem( {
      productName: 'monitor',
      price: 200,
      quantity: 40,
      country: shoppingCart.client.country,
      amount: 0,
      taxes: 0
    } );
    shoppingCart.calculateCheckOut( {
      paymentMethod: 'PayPal',
      paymentId: 'x-le/159',
      shippingAddress: 'One Street',
      billingAddress: 'Corp. Building'
    } );

    assert.actual = mocks.theWarehouse.productCatalog[0].stock;
    assert.expected = mocks.theWarehouse.productCatalog[0].minimumStock;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
