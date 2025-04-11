import React from 'react';
import ModalWrapper from './ModalWrapper';
import {ButtonVariants} from '../type/ButtonVariant';

export interface RemoveOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveOrganizationModal: React.FC<RemoveOrganizationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <div className="dialog-box">
      <h3 className="dialog-box__title">Remove the Organization?</h3>
      <p className="dialog-box__text">
        Are you sure you want to remove this Organization?
      </p>
      <div className="dialog-box__actions">
        <button
          className={`${ButtonVariants.Outline} dialog-box__button`}
          onClick={onClose}
        >
          No
        </button>
        <button
          className={`${ButtonVariants.Filled} dialog-box__button`}
          onClick={onConfirm}
        >
          Yes, remove
        </button>
      </div>
    </div>
    </ModalWrapper>
  );
};

export default RemoveOrganizationModal;
