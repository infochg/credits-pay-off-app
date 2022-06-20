import React from 'react';
import { render } from 'enzyme';
import ErrorPage from './index';

describe('<ErrorPage />', () => {
  const wrapper = render(<ErrorPage />);

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
