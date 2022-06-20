import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from '../../history';
import MakePlan from './index';

describe('<MakePlan /> without any cards', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const store = mockStore({
      paymentsData: null
    });

    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <MakePlan />
        </Provider>
      </Router>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('<MakePlan /> with cards', () => {
  const mockStore = configureStore();
  let wrapper;

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const store = mockStore({
      paymentsData: [
        {
          name: 'Delta Skymiles Gold',
          image: 'https://i.imgur.com/zHjzU2k.png',
          maxBalance: 4533,
          currentBalance: 3135.7524402014715,
          nextPayment: 90.66,
          lastPayment: 90.66,
          lastPaymentDate: '2020-10-11T06:17:18.767522',
          nextPaymentDate: '2020-11-10T06:17:18.767522',
          paymentMade: true,
          paymentLink:
            'https://online.americanexpress.com/myca/logon/us/action/LogonHandler?request_type=LogonHandler&Face=en_US',
          annualFeeDate: '2021-03-30T06:17:18.767522',
          annualFeeAmount: 299,
          interest: {
            apr: 20.99,
            interestPaid: 36,
            principal: 54.66
          }
        }
      ]
    });

    wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <MakePlan />
        </Provider>
      </Router>
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly Balance Remaining', () => {
    expect(wrapper.find('p[name="balanceRemainingValue"]').text()).toContain(
      '$3,135.75'
    );
  });

  it('renders correctly Debt Free Date', () => {
    expect(wrapper.find('p[name="debtFreeDateValue"]').text()).toContain(
      'Sep 2029'
    );
  });

  it('renders correctly Interest Paid', () => {
    expect(wrapper.find('p[name="interestPaidValue"]').text()).toContain(
      '$3,865.62'
    );
  });

  it('renders correctly Avg Interest Rate', () => {
    expect(wrapper.find('p[name="avgInterestRateValue"]').text()).toContain(
      '20.99%'
    );
  });

  it('renders correctly Annual Fees Paid', () => {
    expect(wrapper.find('p[name="annualFeePaidValue"]').text()).toContain(
      '$2,691.00'
    );
  });

  it('renders correctly card name', () => {
    expect(wrapper.find('p[name="cardName"]').text()).toContain(
      'Delta Skymiles Gold'
    );
  });

  it('renders correctly pay off date', () => {
    expect(wrapper.find('p[name="cardPayOffDateValue"]').text()).toContain(
      'Sep 2029'
    );
  });

  it('renders correctly interest rate', () => {
    expect(wrapper.find('p[name="cardInterestRateValue"]').text()).toContain(
      '20.99%'
    );
  });

  it('renders correctly interest paid', () => {
    expect(wrapper.find('p[name="cardInterestPaidValue"]').text()).toContain(
      '$3,865.62'
    );
  });
});
