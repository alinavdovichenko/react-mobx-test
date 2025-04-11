import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { AddPhotoIcon, TrashIcon } from "../Icon";
import { Button } from "../Buttons";
import { ButtonVariants } from "../../type/ButtonVariant";
import { companyStore } from "@/stores/CompanyStore";
const PhotosCard = observer(() => {
    const fileInputRef = useRef(null);
    const [localPhotos, setLocalPhotos] = useState([]);
    const [hiddenServerPhotoNames, setHiddenServerPhotoNames] = useState([]);
    const handleAddClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLocalPhotos(prev => [...prev, file]);
        }
    };
    const handleRemoveLocal = (name) => {
        setLocalPhotos(prev => prev.filter(f => f.name !== name));
    };
    const handleHideServer = (name) => {
        setHiddenServerPhotoNames(prev => [...prev, name]);
    };
    const serverPhotos = (companyStore.company?.photos || []).filter(photo => !hiddenServerPhotoNames.includes(photo.name));
    return (_jsxs("section", { className: "card card--photos", children: [_jsxs("div", { className: "card__header", children: [_jsx("h2", { className: "card__title", children: "Photos" }), _jsx(Button, { Icon: AddPhotoIcon, text: "Add", variant: ButtonVariants.Flattened, onClick: handleAddClick }), _jsx("input", { type: "file", ref: fileInputRef, accept: "image/*", style: { display: "none" }, onChange: handleFileChange })] }), _jsx("div", { className: "card__body", children: _jsxs("div", { className: "card__photos-list", children: [serverPhotos.map(photo => (_jsxs("div", { className: "card__photo-item", children: [_jsx("img", { src: photo.thumbpath || photo.filepath, alt: photo.name }), _jsx(Button, { Icon: TrashIcon, text: "", variant: ButtonVariants.Icon, onClick: () => handleHideServer(photo.name) })] }, photo.name))), localPhotos.map(file => (_jsxs("div", { className: "card__photo-item", children: [_jsx("img", { src: URL.createObjectURL(file), alt: file.name }), _jsx(Button, { Icon: TrashIcon, text: "", variant: ButtonVariants.Icon, onClick: () => handleRemoveLocal(file.name) })] }, file.name)))] }) })] }));
});
export default PhotosCard;
