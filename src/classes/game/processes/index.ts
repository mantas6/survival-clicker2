type ProcessType = 'manual' | 'auto';

export abstract class Process {
  public name?: string;
  public readonly type?: ProcessType;

  public checkInput() {
    return;
  }
}
