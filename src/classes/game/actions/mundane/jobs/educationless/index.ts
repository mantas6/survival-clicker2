import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { Janitor } from './janitor';
import { JanitorDaily } from './janitor-daily';
import { PizzaDelivery } from './pizza-delivery';

@SerializeAllOn('emit', 'store')
export class Educationless extends Serializable {
  janitor = new Janitor();
  janitorDaily = new JanitorDaily();
  pizzaDelivery = new PizzaDelivery();
}
