import * as fs from 'fs';
import { Assert } from './assert';
import * as mocks from './mocks';

afterAll( () => {
  mocks.cleanCheckOuts();
} );

describe( `As a shop owner, I want to generate invoices, so I can legally sell products`, () => {
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
  shoppingCart.sendInvoiceToCustomer();
  const invoiceFilePath = mocks.invoiceFilePath();
  const invoicePrintingFilePath = mocks.invoicePrintingFilePath( shoppingCart.legalAmounts.invoiceNumber );

  assert = {
    given: 'a shopping cart already ordered',
    should: `generate invoice and send to customer email address on ${invoiceFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = fs.existsSync( invoiceFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );

  assert = {
    given: 'a shopping cart already ordered',
    should: `print invoice on ${invoicePrintingFilePath}`
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    assert.actual = fs.existsSync( invoicePrintingFilePath );
    assert.expected = true;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
