import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { setupMaster } from 'cluster';

Enzyme.configure({ adapter: new EnzymeAdapter });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/**
 * Factory function to create a shallowwrapper for the app component.
@Function setup
@param {object} props - Component props specific to this setup.
@param {any} state - Component state for setup.
@return {shallowwrapper}
 * 
 */
const setup = (props = {}, state = {}) => {
  return shallow(<App {...props} />)
}

/**
 * Return shallowWrapper containing node(s) with the given data-test Value.
 * @param {shallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - value of data-test attribute for search.
 * @return {shallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('render without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

//old way writting, before using the function findByTestAttr..
test('counter starts at 0', () => {
  const wrapper = setup();
  const counter = wrapper.find("[data-test='counter-start']");
  expect(counter.length).toBe(1);
});

//old way writting, before using the function findByTestAttr..
test('clicking button increments counter display', () => {
  const wrapper = setup();
  const couterStart = wrapper.find("[data-test='counter-increment']");
  expect(couterStart.length).toBe(1);
})