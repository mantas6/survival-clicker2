import { Stat } from '@/classes/game/stat';

interface Stats {
  character: {
    health: Stat;
  };
}

export class Game {
  public stats?: Stats;
}
