import { Action, UnlocksWhen, NoMultiplier } from '@/classes/game/base/actions';

@NoMultiplier
@UnlocksWhen(action => action.stats.skills.fitness.value.greaterThan(0))
export class Stamina extends Action {

}
