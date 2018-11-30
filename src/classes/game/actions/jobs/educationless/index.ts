import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Janitor } from './janitor';
import { PizzaDelivery } from './pizza-delivery';

@SerializeAllOn('emit', 'store')
export class Educationless extends Serializable {
  janitor = new Janitor();
  pizzaDelivery = new PizzaDelivery();
}
