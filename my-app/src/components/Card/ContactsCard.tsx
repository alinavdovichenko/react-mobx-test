import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { companyStore } from "@/stores/CompanyStore";
import { EditIcon, SaveIcon, CancelIcon } from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';

enum ContactFields {
  FULL_NAME = 'Full name',
  PHONE_NUMBER = 'Phone number',
  EMAIL = 'E-mail',
}

const ContactsCard = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    [ContactFields.FULL_NAME]: '',
    [ContactFields.PHONE_NUMBER]: '',
    [ContactFields.EMAIL]: '',
  });

  useEffect(() => {
    const disposer = autorun(() => {
      const contact = companyStore.contact;
      if (contact) {
        setFormData({
          [ContactFields.FULL_NAME]: `${contact.firstname} ${contact.lastname}`,
          [ContactFields.PHONE_NUMBER]: contact.phone || '',
          [ContactFields.EMAIL]: contact.email || '',
        });
      }
    });

    return () => disposer(); // очистка при размонтировании
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!companyStore.contact) return;

    const [firstname, ...rest] = formData[ContactFields.FULL_NAME].trim().split(' ');
    const lastname = rest.join(' ');

    try {
      await companyStore.updateContact(companyStore.contact.id, {
        firstname,
        lastname,
        phone: formData[ContactFields.PHONE_NUMBER],
        email: formData[ContactFields.EMAIL],
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка при сохранении контакта', err);
    }
  };

  const handleCancel = () => {
    const contact = companyStore.contact;
    if (contact) {
      setFormData({
        [ContactFields.FULL_NAME]: `${contact.firstname} ${contact.lastname}`,
        [ContactFields.PHONE_NUMBER]: contact.phone || '',
        [ContactFields.EMAIL]: contact.email || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <section className="card card--contacts">
      <div className="card__header">
        <h2 className="card__title">Contacts</h2>
        {isEditing ? (
          <div className="card__edit-actions">
            <Button Icon={SaveIcon} text="Save changes" variant={ButtonVariants.Flattened} onClick={handleSave} />
            <Button Icon={CancelIcon} text="Cancel" variant={ButtonVariants.Flattened} onClick={handleCancel} />
          </div>
        ) : (
          <Button Icon={EditIcon} text="Edit" variant={ButtonVariants.Flattened} onClick={() => setIsEditing(true)} />
        )}
      </div>

      <div className="card__body">
        {isEditing ? (
          <div className="form">
            <div className="form__row">
              <label className="form__label">{ContactFields.FULL_NAME}:</label>
              <input
                className="form__input form__input--long"
                type="text"
                name={ContactFields.FULL_NAME}
                value={formData[ContactFields.FULL_NAME]}
                onChange={handleChange}
              />
            </div>
            <div className="form__row">
              <label className="form__label">{ContactFields.PHONE_NUMBER}:</label>
              <input
                className="form__input form__input--long"
                type="text"
                name={ContactFields.PHONE_NUMBER}
                value={formData[ContactFields.PHONE_NUMBER]}
                onChange={handleChange}
              />
            </div>
            <div className="form__row">
              <label className="form__label">{ContactFields.EMAIL}:</label>
              <input
                className="form__input form__input--long"
                type="email"
                name={ContactFields.EMAIL}
                value={formData[ContactFields.EMAIL]}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="grid-container">
            <div className="grid-item label">{ContactFields.FULL_NAME}:</div>
            <div className="grid-item value">{formData[ContactFields.FULL_NAME]}</div>

            <div className="grid-item label">{ContactFields.PHONE_NUMBER}:</div>
            <div className="grid-item value">{formData[ContactFields.PHONE_NUMBER]}</div>

            <div className="grid-item label">{ContactFields.EMAIL}:</div>
            <div className="grid-item value">{formData[ContactFields.EMAIL]}</div>
          </div>
        )}
      </div>
    </section>
  );
});

export default ContactsCard;
