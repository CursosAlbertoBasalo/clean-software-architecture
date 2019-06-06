import * as fs from 'fs';
import { Assert } from './assert';
import * as mocks from './mocks';

afterAll( () => {
  mocks.cleanCheckOuts();
} );

describe( `As a warehouse employee, I want to process pending orders, so I can satisfy our customers`, () => {
  let assert : Assert;

  const shoppingCart = mocks.newShoppingCart;
  shoppingCart.calculateCheckOut( {
    paymentMethod: 'PayPal',
    paymentId: 'x-le/159',
    shippingAddress: 'One Street',
    billingAddress: 'Corp. Building'
  } );
  const shipmentFilePath = mocks.shipmentFilePath( shoppingCart.legalAmounts.invoiceNumber );

  assert = {
    given: 'an pending order',
    should: `process it and create a shipment ${shipmentFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const oneWarehouse = mocks.oneWarehouse;
    oneWarehouse.processOrders();
    assert.actual = fs.existsSync( shipmentFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
