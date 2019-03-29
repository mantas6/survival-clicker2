import { ToggleAction, NoMultiplier, Persist, NoFavorites } from '@/classes/game/base/actions';

@NoMultiplier
@Persist
@NoFavorites
export class Immortality extends ToggleAction {

}
