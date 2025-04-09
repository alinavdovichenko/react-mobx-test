import {useState} from 'react';
import {EditIcon, SaveIcon, CancelIcon} from '../Icon';
import {Button} from '../Buttons';
import {ButtonVariants} from '../../type/ButtonVariant';

enum ContactFields {
    RESPONSIBLE_PERSON = 'Responsible person',
    PHONE_NUMBER = 'Phone number',
    EMAIL = 'E-mail',
}

const ContactValues: Record<ContactFields, string> = {
    [ContactFields.RESPONSIBLE_PERSON]: 'David Rosenberg',
    [ContactFields.PHONE_NUMBER]: '+1 702 555 2345',
    [ContactFields.EMAIL]: 'david_rosenberg88@gmail.com',
};

const ContactsCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(ContactValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        
    };

    const handleCancel = () => {
        setFormData(ContactValues);
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
                            <label className="form__label">{ContactFields.RESPONSIBLE_PERSON}:</label>
                            <input
                                className="form__input form__input--long"
                                type="text"
                                name={ContactFields.RESPONSIBLE_PERSON}
                                value={formData[ContactFields.RESPONSIBLE_PERSON]}
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
                        <div className="grid-item label">{ContactFields.RESPONSIBLE_PERSON}:</div>
                        <div className="grid-item value">{formData[ContactFields.RESPONSIBLE_PERSON]}</div>

                        <div className="grid-item label">{ContactFields.PHONE_NUMBER}:</div>
                        <div className="grid-item value">{formData[ContactFields.PHONE_NUMBER]}</div>

                        <div className="grid-item label">{ContactFields.EMAIL}:</div>
                        <div className="grid-item value">{formData[ContactFields.EMAIL]}</div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ContactsCard;