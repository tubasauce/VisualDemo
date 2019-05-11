import React, {PropTypes} from 'react';
import Modal from '../modal/modal';

const ModalDiffDetail = p => {
  const {diffImageUrl} = p;
  return (
    <Modal
      isOpen={!!diffImageUrl}
      title="Change Diff Details"
      onClose={p.onClose}
      isFullScreen
    >
      <div className="text-center">
        <img className="img-responsive hide-broken-img" src={diffImageUrl} />
      </div>
    </Modal>
  );
};

ModalDiffDetail.propTypes = {
  diffImageUrl: PropTypes.string,
  onClose: PropTypes.func
};

export default ModalDiffDetail;
