import React, {PropTypes} from 'react';
import {
  Modal as ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody
} from 'react-modal-bootstrap';

const Modal = p => {
  const {isFullScreen, isOpen, title, children} = p;
  const autoWidth = {
    base: {
      width: 'auto'
    }
  };
  return (
    <ModalContainer
      isOpen={isOpen}
      onRequestHide={p.onClose}
      dialogStyles={isFullScreen && autoWidth}
      className={isFullScreen && 'modal-height-auto'}
    >
      <ModalHeader>
        <ModalClose onClick={p.onClose} />
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </ModalContainer>
  );
};

Modal.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
  isFullScreen: false
};

export default Modal;
