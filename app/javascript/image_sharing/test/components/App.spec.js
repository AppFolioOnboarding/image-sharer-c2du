/* eslint-env mocha */

import assert from 'assert';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import App from '../../components/App';
import * as api from '../../utils/helper';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should render correctly', () => {
    assert(wrapper.contains('Tell us what you think'));
    assert.strictEqual(wrapper.find('input[name="name"]').length, 1);
    assert.strictEqual(wrapper.find('textarea[name="comments"]').length, 1);
    assert.strictEqual(wrapper.find('button').text(), 'Submit');
    assert.strictEqual(wrapper.find('footer').text(), 'Copyright: Appfolio Inc. Onboarding');
  });

  describe('submitFeedback', () => {
    const sandbox = sinon.createSandbox();
    let preventDefaultSpy;

    beforeEach(() => {
      preventDefaultSpy = sandbox.spy();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should send correct api call', () => {
      const postStub = sandbox.stub(api, 'post').resolves({ status: 'fakeStatus', message: 'fakeMessage' });
      wrapper.instance().setState({ name: 'Conn', comments: 'whatever' });
      wrapper.update();
      return wrapper.instance().submitFeedback({ preventDefault: preventDefaultSpy }).then(() => {
        assert(postStub.calledOnceWithExactly('/api/feedbacks', { feedback: { name: 'Conn', comments: 'whatever' } }));
      });
    });

    it('api call should fail with empty form', () => {
      const postStub = sandbox.stub(api, 'post').rejects({ data: { status: 'fakeStatus', message: 'fakeMessage' } });
      wrapper.instance().setState({ name: 'Conn', comments: 'whatever' });
      wrapper.update();
      return wrapper.instance().submitFeedback({ preventDefault: preventDefaultSpy }).then(() => {
        assert(postStub.calledOnceWithExactly('/api/feedbacks', { feedback: { name: 'Conn', comments: 'whatever' } }));
      });
    });

    it('should render alert based on status and message and clear form', () => {
      const postStub = sandbox.stub(api, 'post').resolves({ status: 'fakeStatus', message: 'fakeMessage' });
      wrapper.instance().setState({ name: 'Conn', comments: 'whatever' });
      wrapper.update();
      return wrapper.instance().submitFeedback({ preventDefault: preventDefaultSpy }).then(() => {
        assert(postStub.calledOnceWithExactly('/api/feedbacks', { feedback: { name: 'Conn', comments: 'whatever' } }));
        wrapper.update();
        assert.strictEqual(wrapper.find('div.alert-fakeStatus').length, 1);
        assert.strictEqual(wrapper.find('div.alert-fakeStatus').text(), 'fakeMessage');
        assert.strictEqual(wrapper.find('input[name="name"]').text(), '');
        assert.strictEqual(wrapper.find('textarea[name="comments"]').text(), '');
      });
    });

    it('preventDefault should be called once', () => {
      sandbox.stub(api, 'post').resolves();
      const event = { preventDefault: preventDefaultSpy };
      return wrapper.instance().submitFeedback(event).then(() => {
        assert(preventDefaultSpy.calledOnce);
      });
    });
  });
});
