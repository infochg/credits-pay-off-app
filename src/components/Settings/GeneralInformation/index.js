import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GeneralInformationForm from './GeneralInformationForm';
import ErrorBoundary from '../../../containers/ErrorBoundary';

function GeneralInformation(props) {
  const { data, updateUserInfo, loading, goBack } = props;
  const [showPreloader, setShowPreloader] = useState(false);

  try {
    const submit = values => {
      const vals = {};
      if (values.email) {
        vals.email = values.email;
      }
      if (values.firstName) {
        vals.firstName = values.firstName;
      }
      // vals.firstName = values.firstName;
      if (values.lastName) {
        vals.lastName = values.lastName;
      }
      // if (values.phoneNumber) {
      //   vals.phoneNumber = values.phoneNumber;
      // }
      updateUserInfo({ ...vals });
      setShowPreloader(true);
    };

    useEffect(() => {
      if (loading === false) {
        setShowPreloader(false);
      }
    }, [loading]);

    return (
      <GeneralInformationForm
        initialValues={data}
        onSubmit={submit}
        showPreloader={showPreloader}
        goBack={goBack}
      />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

GeneralInformation.defaultProps = {
  data: undefined,
  updateUserInfo: undefined,
  loading: undefined,
  goBack: undefined
};

GeneralInformation.propTypes = {
  data: PropTypes.shape({}),
  updateUserInfo: PropTypes.func,
  loading: PropTypes.bool,
  goBack: PropTypes.func
};

export default GeneralInformation;
