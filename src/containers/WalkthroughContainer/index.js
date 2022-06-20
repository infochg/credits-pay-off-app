import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Walkthrough from '../../components/Common/Walkthrough';
import Modal from '../../components/Common/Modal';

import { UPDATE_USER_INFO_REQUEST } from '../../redux/actions/actionTypes';

function WalkthroughContainer(props) {
  const { updateUserInfo, loading, walkthrough } = props;

  const [openTutorialModal, setOpenTutorialModal] = useState(true);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const handleCloseTutorialModal = () => {
    updateUserInfo({ registration: 'done' });
  };

  const handleOpenWalkthrough = () => {
    setOpenTutorialModal(false);
    setShowWalkthrough(true);
  };

  return (
    <React.Fragment>
      <Modal
        isOpened={openTutorialModal}
        closeModal={handleCloseTutorialModal}
        callback={handleOpenWalkthrough}
        title="Tutorial"
        text="Your data will be added after you complete the walkthrough."
        loading={loading}
        yesBtnText="Ok"
        noBtnText="Skip"
      />

      {showWalkthrough && (
        <Walkthrough data={walkthrough} onFinish={updateUserInfo} />
      )}
    </React.Fragment>
  );
}

WalkthroughContainer.propTypes = {
  userInfo: PropTypes.shape({}),
  updateUserInfo: PropTypes.func,
  loading: PropTypes.bool,
  walkthrough: PropTypes.arrayOf(PropTypes.shape({}))
};

WalkthroughContainer.defaultProps = {
  userInfo: undefined,
  updateUserInfo: undefined,
  loading: undefined,
  walkthrough: undefined
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  walkthrough: state.walkthrough,
  loading: state.loading
});

const actionsStateToProps = {
  updateUserInfo: data => ({ type: UPDATE_USER_INFO_REQUEST, data })
};

export default connect(
  mapStateToProps,
  actionsStateToProps
)(WalkthroughContainer);
