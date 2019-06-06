import { Assert } from './assert';
import * as mocks from './mocks';

afterEach( () => {
  mocks.cleanCheckOuts();
} );

describe( `As a customer, I want to check out, so I can pay and get the products`, () => {
  let assert : Assert;

  const shoppingCart = mocks.newShoppingCart;

  assert = {
    given: 'a shopping cart',
    should: 'calculate check out'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCart.addLineItem( {
      productName: 'computer',
      price: 1000,
      quantity: 1,
      country: shoppingCart.client.country,
      amount: 0,
      taxes: 0
    } );
    shoppingCart.addLineItem( {
      productName: 'monitor',
      price: 200,
      quantity: 25,
      country: shoppingCart.client.country,
      amount: 0,
      taxes: 0
    } );
    shoppingCart.addLineItem( {
      productName: 'course',
      price: 100,
      quantity: 10,
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
    assert.actual = shoppingCart.legalAmounts.total;
    assert.expected = 6615;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart',
    should: 'have an invoice number'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    shoppingCart.calculateCheckOut( {
      paymentMethod: 'PayPal',
      paymentId: 'x-le/159',
      shippingAddress: 'One Street',
      billingAddress: 'Corp. Building'
    } );
    assert.actual = shoppingCart.legalAmounts.invoiceNumber;
    assert.expected = 0;
    expect( assert.actual ).toBeGreaterThan( assert.expected );
  } );
} );
