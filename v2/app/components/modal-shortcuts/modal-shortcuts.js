import React, {PropTypes} from 'react';
import Modal from '../modal/modal';

const ModalShortcuts = (p) => {
  const {isOpen} = p;
  return (
    <Modal isOpen={isOpen} title="Keyboard Shortcuts" onClose={p.onClose}>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="glyphicon glyphicon-arrow-left"></div>
        </div>
        <p className="col-xs-9">Go to previous state</p>
      </div>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="glyphicon glyphicon-arrow-right"></div>
        </div>
        <p className="col-xs-9">Go to next state</p>
      </div>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="label label-contrast">shift</div>
          <span>&nbsp;+&nbsp;</span>
          <div className="glyphicon glyphicon-arrow-up"></div>
        </div>
        <p className="col-xs-9">Set status to Accepted</p>
      </div>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="label label-contrast">shift</div>
          <span>&nbsp;+&nbsp;</span>
          <div className="glyphicon glyphicon-arrow-down"></div>
        </div>
        <p className="col-xs-9">Set status to Rejected</p>
      </div>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="label label-contrast">x</div>
        </div>
        <p className="col-xs-9">Toggle highlights</p>
      </div>
      <div className="row">
        <div className="col-xs-3 text-right">
          <div className="label label-contrast">esc</div>
        </div>
        <p className="col-xs-9">Exit State Viewer</p>
      </div>
    </Modal>
  );
};

ModalShortcuts.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalShortcuts;
