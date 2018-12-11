/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import NumberFormat from '@/components/NumberFormat.vue';

describe('NumberFormat.vue', () => {
  it('renders value when passed', () => {
    const value = '1000';
    const wrapper = shallowMount(NumberFormat, {
      propsData: { value },
    });

    expect(wrapper.text()).to.include('1,000');
  });

  it('renders postfix when passed', () => {
    const value = '1000';
    const postFix = '$';
    const wrapper = shallowMount(NumberFormat, {
      propsData: { value, postFix },
    });

    expect(wrapper.text()).to.include('1,000$');
  });
});
