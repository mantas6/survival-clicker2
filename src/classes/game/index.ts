import { Stat } from './stat';

interface Stats {
  character: {
    health: Stat;
  };
}

export class Game {
  public stats?: Stats;
}
