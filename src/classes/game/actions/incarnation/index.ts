import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';

@SerializeAllOn('emit', 'store')
export class Incarnation extends Serializable {

}
