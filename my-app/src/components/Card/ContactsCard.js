import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { companyStore } from "@/stores/CompanyStore";
import { EditIcon, SaveIcon, CancelIcon } from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';
var ContactFields;
(function (ContactFields) {
    ContactFields["FULL_NAME"] = "Full name";
    ContactFields["PHONE_NUMBER"] = "Phone number";
    ContactFields["EMAIL"] = "E-mail";
})(ContactFields || (ContactFields = {}));
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSave = async () => {
        if (!companyStore.contact)
            return;
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
        }
        catch (err) {
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
    return (_jsxs("section", { className: "card card--contacts", children: [_jsxs("div", { className: "card__header", children: [_jsx("h2", { className: "card__title", children: "Contacts" }), isEditing ? (_jsxs("div", { className: "card__edit-actions", children: [_jsx(Button, { Icon: SaveIcon, text: "Save changes", variant: ButtonVariants.Flattened, onClick: handleSave }), _jsx(Button, { Icon: CancelIcon, text: "Cancel", variant: ButtonVariants.Flattened, onClick: handleCancel })] })) : (_jsx(Button, { Icon: EditIcon, text: "Edit", variant: ButtonVariants.Flattened, onClick: () => setIsEditing(true) }))] }), _jsx("div", { className: "card__body", children: isEditing ? (_jsxs("div", { className: "form", children: [_jsxs("div", { className: "form__row", children: [_jsxs("label", { className: "form__label", children: [ContactFields.FULL_NAME, ":"] }), _jsx("input", { className: "form__input form__input--long", type: "text", name: ContactFields.FULL_NAME, value: formData[ContactFields.FULL_NAME], onChange: handleChange })] }), _jsxs("div", { className: "form__row", children: [_jsxs("label", { className: "form__label", children: [ContactFields.PHONE_NUMBER, ":"] }), _jsx("input", { className: "form__input form__input--long", type: "text", name: ContactFields.PHONE_NUMBER, value: formData[ContactFields.PHONE_NUMBER], onChange: handleChange })] }), _jsxs("div", { className: "form__row", children: [_jsxs("label", { className: "form__label", children: [ContactFields.EMAIL, ":"] }), _jsx("input", { className: "form__input form__input--long", type: "email", name: ContactFields.EMAIL, value: formData[ContactFields.EMAIL], onChange: handleChange })] })] })) : (_jsxs("div", { className: "grid-container", children: [_jsxs("div", { className: "grid-item label", children: [ContactFields.FULL_NAME, ":"] }), _jsx("div", { className: "grid-item value", children: formData[ContactFields.FULL_NAME] }), _jsxs("div", { className: "grid-item label", children: [ContactFields.PHONE_NUMBER, ":"] }), _jsx("div", { className: "grid-item value", children: formData[ContactFields.PHONE_NUMBER] }), _jsxs("div", { className: "grid-item label", children: [ContactFields.EMAIL, ":"] }), _jsx("div", { className: "grid-item value", children: formData[ContactFields.EMAIL] })] })) })] }));
});
export default ContactsCard;
