import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

	 const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

	  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal show" style={{ display: 'block' }} onClick={onClose}>
      <div className="modal-dialog" onClick={stopPropagation}>
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </div>
  );
};

export default Modal;

