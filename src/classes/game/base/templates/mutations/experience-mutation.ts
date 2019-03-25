import { Mutation } from '@/classes/game/base/mutations';
import { DiffFunction } from '@/classes/game/base/mutations/mutation';
import { Value, Skill } from '@/classes/game/base/stats';

export class ExperienceMutation extends Mutation<Value> {
  constructor(statFunc: () => Skill, diffFunc: DiffFunction) {
    const experienceStatFunc = () => statFunc().experience;
    super(experienceStatFunc, calcOpts => {
      const diff = diffFunc(calcOpts);

      const finalDiff = diff.div(this.stats.skills.totalLevel.add(1));

      return finalDiff;
    });
  }
}
