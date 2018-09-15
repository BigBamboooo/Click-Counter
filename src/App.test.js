import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter });

/**
 * Factory function to create a shallowwrapper for the app component.
@Function setup
@param {object} props - Component props specific to this setup.
@param {object} state - Component state for setup.
@return {shallowwrapper}
 * 
 */
const setup = (props = {}, state = {}) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state)
  }
  return wrapper;
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

test('render Counter display',()=>{
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.length).toBe(1);
})

//old way writting, before using the function findByTestAttr..
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

//old way writting, before using the function findByTestAttr..
test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, {counter});
  
  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.text()).toContain(counter+1);
})