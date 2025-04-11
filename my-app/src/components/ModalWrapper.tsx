import ReactDOM from 'react-dom';
import React from 'react';

interface ModalWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default ModalWrapper;
