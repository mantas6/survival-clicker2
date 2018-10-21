import { Value } from './value';
import { Container } from './container';

/**
 * Describes a limit that is reached after stat mutation
 *
 * true - no limit is reached
 *
 * lessThanMinimum - stat was floored to it's minimum value
 *
 * greaterThanMaximum - stat was ceiled to it's maximum value
 */
export type LimitFlag = true | 'lessThanMinimum' | 'greaterThanMaximum';

export { Value, Container };
