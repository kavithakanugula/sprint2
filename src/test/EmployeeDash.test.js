// import React from 'react';
// import { shallow } from 'enzyme';
// import EmployeeDash from '../components/EmployeeDash';
// import LoggedComponent from '../components/LoggedComponent';
// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme.configure({ adapter: new Adapter() });

// describe('EmployeeDash Component', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallow(<EmployeeDash />);
//   });

//   it('should render LoggedComponent', () => {
//     expect(wrapper.find(LoggedComponent)).toHaveLength(1);
//   });

//   it('should have a nav bar with three links', () => {
//     expect(wrapper.find('.nav-links').find('Link')).toHaveLength(3);
//   });

//   it('should have a link to Task List', () => {
//     const taskListLink = wrapper.find('.nav-links').find('Link').at(0);
//     expect(taskListLink.prop('to')).toEqual('/etasklist');
//     expect(taskListLink.text()).toEqual('Task List');
//   });

//   it('should have a link to Team Mates', () => {
//     const teamMatesLink = wrapper.find('.nav-links').find('Link').at(1);
//     expect(teamMatesLink.prop('to')).toEqual('/eemplist');
//     expect(teamMatesLink.text()).toEqual('Team Mates');
//   });

//   it('should have a link to Extras', () => {
//     const extrasLink = wrapper.find('.nav-links').find('Link').at(2);
//     expect(extrasLink.prop('to')).toEqual('/eprojectlist');
//     expect(extrasLink.text()).toEqual('Extras');
//   });
// });


// import React from 'react';
// import { shallow } from 'enzyme';
// import EmployeeDash from '../components/EmployeeDash';
// import LoggedComponent from '../components/LoggedComponent';
// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme.configure({ adapter: new Adapter() });

// describe('EmployeeDash Component', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallow(<EmployeeDash />);
//   });

//   it('should render LoggedComponent', () => {
//     expect(wrapper.find(LoggedComponent)).toHaveLength(1);
//   });

//   it('should have a nav bar with three links', () => {
//     expect(wrapper.find('.nav-links').find('Link')).toHaveLength(3);
//   });

//   it('should have a link to Task List', () => {
//     const taskListLink = wrapper.find('.nav-links').find('Link').at(1);
//     expect(taskListLink.prop('to')).toEqual('/etasklist');
//     expect(taskListLink.text()).toEqual('Task List');
//   });

//   it('should have a link to Team Mates', () => {
//     const teamMatesLink = wrapper.find('.nav-links').find('Link').at(1);
//     expect(teamMatesLink.prop('to')).toEqual('/eemplist');
//     expect(teamMatesLink.text()).toEqual('Team Mates');
//   });

//   it('should have a link to Extras', () => {
//     const extrasLink = wrapper.find('.nav-links').find('Link').at(2);
//     expect(extrasLink.prop('to')).toEqual('/eprojectlist');
//     expect(extrasLink.text()).toEqual('Extras');
//   });
// });

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmployeeDash from '../components/EmployeeDash';

describe('EmployeeDash component', () => {
  it('should toggle visibility of navbar on scroll', () => {
    const { container } = render(<EmployeeDash />);
    const navbar = container.querySelector('.navbar');

    // Verify that the navbar is visible by default
    expect(navbar).toHaveClass('navbar--visible');

    // Scroll down and verify that the navbar is hidden
    fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    expect(navbar).toHaveClass('navbar--hidden');

    // Scroll up and verify that the navbar is visible again
    fireEvent.scroll(window, { target: { pageYOffset: 0 } });
    expect(navbar).toHaveClass('navbar--visible');
  });
});

