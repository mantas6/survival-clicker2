import { Value } from '.';

export function Persist(ctor: typeof Value) {
  ctor.isPersistent = true;
}
