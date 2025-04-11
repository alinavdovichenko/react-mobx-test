import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import {ButtonVariants} from '../type/ButtonVariant';

export interface EditOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
}

const EditOrganizationModal: React.FC<EditOrganizationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName,
}) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <div className="dialog-box">
        <h3 className="dialog-box__title">Specify the Organization's name</h3>
        <input
            className="dialog-box__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <div className="dialog-box__actions">
            <button
            className={`${ButtonVariants.Outline} dialog-box__button`}
            onClick={onClose}
            >
            Cancel
            </button>
            <button
            className={`${ButtonVariants.Filled} dialog-box__button`}
            onClick={() => onSave(name)}
            >
            Save changes
            </button>
        </div>
    </div>
    </ModalWrapper>
  );
};

export default EditOrganizationModal;
