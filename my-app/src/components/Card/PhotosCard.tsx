import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { AddPhotoIcon, TrashIcon } from "../Icon";
import { Button } from "../Buttons";
import { ButtonVariants } from "../../type/ButtonVariant";
import { companyStore } from "../../stores/CompanyStore";

const PhotosCard = observer(() => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localPhotos, setLocalPhotos] = useState<File[]>([]);
  const [hiddenServerPhotoNames, setHiddenServerPhotoNames] = useState<string[]>([]);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalPhotos(prev => [...prev, file]);
    }
  };

  const handleRemoveLocal = (name: string) => {
    setLocalPhotos(prev => prev.filter(f => f.name !== name));
  };

  const handleHideServer = (name: string) => {
    setHiddenServerPhotoNames(prev => [...prev, name]);
  };

  const serverPhotos = (companyStore.company?.photos || []).filter(
    photo => !hiddenServerPhotoNames.includes(photo.name)
  );

  return (
    <section className="card card--photos">
      <div className="card__header">
        <h2 className="card__title">Photos</h2>
        <Button
          Icon={AddPhotoIcon}
          text="Add"
          variant={ButtonVariants.Flattened}
          onClick={handleAddClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <div className="card__body">
        <div className="card__photos-list">
          {serverPhotos.map(photo => (
            <div className="card__photo-item" key={photo.name}>
              <img src={photo.thumbpath || photo.filepath} alt={photo.name} />
              <Button
                Icon={TrashIcon}
                text=""
                variant={ButtonVariants.Icon}
                onClick={() => handleHideServer(photo.name)}
              />
            </div>
          ))}

          {localPhotos.map(file => (
            <div className="card__photo-item" key={file.name}>
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <Button
                Icon={TrashIcon}
                text=""
                variant={ButtonVariants.Icon}
                onClick={() => handleRemoveLocal(file.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default PhotosCard;
