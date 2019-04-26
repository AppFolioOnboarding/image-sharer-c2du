/* eslint-env mocha */

import assert from 'assert';
import { mount } from 'enzyme';
import React from 'react';
import App from '../../components/App';

describe('<App />', () => {
  it('should render correctly', () => {
    const wrapper = mount(<App />);
    assert(wrapper.contains('Tell us what you think'));
    assert.strictEqual(wrapper.find('input[name="name"]').length, 1);
    assert.strictEqual(wrapper.find('textarea[name="comments"]').length, 1);
    assert.strictEqual(wrapper.find('button').text(), 'Submit');
    assert.strictEqual(wrapper.find('footer').text(), 'Copyright: Appfolio Inc. Onboarding');
  });
});
