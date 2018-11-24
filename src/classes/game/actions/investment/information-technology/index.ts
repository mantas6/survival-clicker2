import { Serializable, SerializeAllOn } from '@/classes/game/base/serialization';
import { CreateUnfairLotteryWebsite } from './create-unfair-lottery-website';

@SerializeAllOn('emit', 'store')
export class InformationTechnology extends Serializable {
  createUnfairLotteryWebsite = new CreateUnfairLotteryWebsite();
}
