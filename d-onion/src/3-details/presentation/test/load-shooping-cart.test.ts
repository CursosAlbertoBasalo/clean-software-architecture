import { ShoppingCart } from '../../../1-domain/model/shopping-cart';
import { ShoppingCartService } from '../../../2-application/app/shopping-cart-service';
import { ShoppingCartRepository } from '../../infrastructure/data/shopping-cart-repository';
import { Assert } from './model/assert';

let assert: Assert;

describe( `1- As a customer, I want to restore my current shopping cart, so I can continue buying`, () => {
  assert = {
    given: 'a saved shopping cart',
    should: 'restore it'
  };
  test( `given ${assert.given} should ${assert.should}`, () => {
    const shoppingCartId = 'A-jsn1';
    const shoppingCartRepository = new ShoppingCartRepository();
    const shoppingCartService = new ShoppingCartService( shoppingCartRepository );
    const actualShoppingCart = shoppingCartService.load( shoppingCartId );
    const expectedShoppingCart = new ShoppingCart();
    expectedShoppingCart.id = shoppingCartId;
    assert.actual = actualShoppingCart;
    assert.expected = expectedShoppingCart;
    expect( assert.actual ).toEqual( assert.expected );
  } );
} );
