import * as fs from 'fs';
import { Assert } from './assert';
import * as mocks from './mocks';

afterEach( () => {
  mocks.cleanCheckOuts();
} );

describe( `As a shop owner, I want to generate orders, so I can send products to customers`, () => {
  let assert : Assert;

  const shoppingCart = mocks.newShoppingCart;
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
  const orderFilePath = mocks.orderFilePath( shoppingCart.legalAmounts.invoiceNumber );

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
