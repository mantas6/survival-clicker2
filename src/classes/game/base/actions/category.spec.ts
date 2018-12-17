/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Category, Action } from '.';

class GenericCategory extends Category {
  someAction = new GenericAction();
}

class GenericAction extends Action {

}

describe('actions/category', function() {
  it('represents unseen state correctly', function() {
    const category = new GenericCategory();
    expect(category.hasUnseen).to.be.undefined;

    category.someAction.isUnlocked = true;

    expect(category.hasUnseen).to.be.true;

    category.someAction.isSeen = true;
    expect(category.hasUnseen).to.be.undefined;
  });
});
