import React, {PropTypes} from 'react';
import Modal from '../modal/modal';

const ModalStyleDetail = (p) => {
  const {changes} = p;
  return (
    <Modal isOpen={!!changes} title="Style Change Details" onClose={p.onClose}>
      <table className="table table-striped table-bordered small">
        <thead>
          <tr>
            <td className="strong">Previous</td>
            <td className="strong">Current</td>
          </tr>
        </thead>
        {changes && changes.map((change, index) => (
          <tbody key={index}>
            <tr>
              <td colSpan="2">
                <h5 className="no-margin">
                  <span className="label label-warning space-right">{change.name}</span>
                  <span className="label label-contrast">{change.type}</span>
                </h5>
              </td>
            </tr>
            <tr>
              <td style={{minWidth: '200px', maxWidth: '250px'}}>
                <div className="truncate" title={change.left}>{change.left}</div>
              </td>
              <td style={{minWidth: '200px', maxWidth: '250px'}}>
                <div className="truncate" title={change.right}>{change.right}</div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </Modal>
  );
};

ModalStyleDetail.propTypes = {
  changes: PropTypes.any,
  onClose: PropTypes.func
};

export default ModalStyleDetail;
