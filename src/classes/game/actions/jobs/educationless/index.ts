import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Janitor } from './janitor';
import { PizzaDeliveryDriver } from './pizza-delivery-driver';

@SerializeAllOn('emit', 'store')
export class Educationless extends Serializable {
  janitor = new Janitor();
  pizzaDeliveryDriver = new PizzaDeliveryDriver();
}
