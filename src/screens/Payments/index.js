import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardsGroup from '../../components/Payments/CardsGroup';
import Preloader from '../../components/Common/Preloader';
import CardsSorting from '../../components/Payments/CardsSorting';
import PaymentsInfo from '../../components/Payments/PaymentsInfo';
import NoDebts from '../../components/Payments/NoDebts';
import GlobalBanner from '../../components/Payments/GlobalBanner';
import ErrorBoundary from '../../containers/ErrorBoundary';

import {
  PAYMENTS_DATA_REQUEST,
  TOGGLE_ADD_ACCOUNT,
  WRONG_IMAGE_REQUEST,
  WRONG_IMAGE_SUCCESS
} from '../../redux/actions/actionTypes';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%'
  }
}));

function Payments(props) {
  const {
    paymentsData,
    fetchPaymentsData,
    userInfo,
    sendWrongImageReport,
    isWrongImageReqSent,
    resetWrongImageReport,
    loading,
    toggleAddAccountModal
  } = props;
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (!paymentsData) {
      fetchPaymentsData();
    }
  }, [paymentsData, fetchPaymentsData]);

  // Global Payments Banner
  const [isGlobalBanner, setIsGlobalBanner] = useState({});

  const openGlobalBanner = id => {
    const data = { ...isGlobalBanner };
    data[id] = id;
    setIsGlobalBanner(data);
  };

  const closeGlobalBanner = id => {
    const data = { ...isGlobalBanner };
    if (data[id]) {
      delete data[id];
    }
    setIsGlobalBanner(data);
  };

  const removeGlobalBanner = () => {
    setIsGlobalBanner({});
  };

  try {
    const setData = data => {
      setFilteredData(data);
    };

    let cardsArray = [];
    if (filteredData) {
      Object.values(filteredData).map(item => {
        cardsArray = cardsArray.concat(item);
        return null;
      });
    }

    return (
      <div className={classes.container}>
        <PaymentsInfo data={paymentsData} />

        <CardsSorting data={paymentsData} setData={setData} />

        {Object.keys(isGlobalBanner).length > 0 && (
          <GlobalBanner
            removeGlobalBanner={removeGlobalBanner}
            isGlobalBanner={isGlobalBanner}
          />
        )}

        {paymentsData && filteredData ? (
          Object.keys(filteredData).map(item => {
            if (filteredData[item].length > 0) {
              return (
                <CardsGroup
                  key={item}
                  groupName={item}
                  cards={filteredData[item]}
                  userId={userInfo.id}
                  sendWrongImageReport={sendWrongImageReport}
                  isWrongImageReqSent={isWrongImageReqSent}
                  resetWrongImageReport={resetWrongImageReport}
                  loading={loading}
                  isGlobalBanner={isGlobalBanner}
                  openGlobalBanner={openGlobalBanner}
                  closeGlobalBanner={closeGlobalBanner}
                  isTestAccount={userInfo.email === 'test@empathize.com'}
                />
              );
            }
            return null;
          })
        ) : (
          <Preloader isCards />
        )}

        {cardsArray.length === 0 && filteredData && (
          <NoDebts toggleAddAccountModal={toggleAddAccountModal} />
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Payments.defaultProps = {
  paymentsData: undefined,
  fetchPaymentsData: undefined,
  userInfo: undefined,
  sendWrongImageReport: undefined,
  isWrongImageReqSent: undefined,
  resetWrongImageReport: undefined,
  loading: undefined,
  toggleAddAccountModal: undefined
};

Payments.propTypes = {
  paymentsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  fetchPaymentsData: PropTypes.func,
  userInfo: PropTypes.oneOfType({
    id: PropTypes.number
  }),
  sendWrongImageReport: PropTypes.func,
  isWrongImageReqSent: PropTypes.bool,
  resetWrongImageReport: PropTypes.func,
  loading: PropTypes.bool,
  toggleAddAccountModal: PropTypes.func
};

const mapStateToProps = state => ({
  paymentsData: state.paymentsData,
  userInfo: state.userInfo,
  loading: state.loading,
  isWrongImageReqSent: state.isWrongImageReqSent
});

const actionsStateToProps = {
  fetchPaymentsData: () => ({ type: PAYMENTS_DATA_REQUEST }),
  sendWrongImageReport: payload => ({ type: WRONG_IMAGE_REQUEST, payload }),
  resetWrongImageReport: () => ({ type: WRONG_IMAGE_SUCCESS, payload: false }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload })
};

export default connect(mapStateToProps, actionsStateToProps)(Payments);
