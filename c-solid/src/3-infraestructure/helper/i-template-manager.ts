import { ShoppingCart } from '../models/shopping-cart';

export interface ITemplateManager {
  getTemplate( shoppingCart: ShoppingCart ): string;
  getMessage( content: string ): string;
}
