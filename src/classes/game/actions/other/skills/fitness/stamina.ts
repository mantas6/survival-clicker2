import { Action, UnlocksWhen, NoMultiplier } from '@/classes/game/base/actions';
import { When } from '@/classes/game/base/processes';

@NoMultiplier
@UnlocksWhen(action => action.stats.skills.fitness.value.greaterThan(0))
export class Stamina extends Action {

}
