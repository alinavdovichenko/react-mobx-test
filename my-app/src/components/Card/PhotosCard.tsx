import {AddPhotoIcon, TrashIcon} from '../Icon';
import { Button } from '../Buttons';
import { ButtonVariants } from '../../type/ButtonVariant';

const PhotosCard = () => (
  <section className="card card--photos">
    <div className="card__header">
      <h2 className="card__title">Photos</h2>
      <Button Icon={AddPhotoIcon} text="Add" variant={ButtonVariants.Flattened} />
    </div>
    <div className="card__body">
      <div className="card__photos-list">
        <div className="card__photo-item">
          <img src="../../../public/img/img1.jpg" alt="Building 1" />
          <Button Icon={TrashIcon} text="" variant={ButtonVariants.Icon} />
        </div>
        <div className="card__photo-item">
          <img src="../../../public/img/img2.jpg" alt="Building 2" />
          <Button Icon={TrashIcon} text="" variant={ButtonVariants.Icon} />
        </div>
        <div className="card__photo-item">
          <img src="../../../public/img/img3.jpg" alt="Building 3" />
          <Button Icon={TrashIcon} text="" variant={ButtonVariants.Icon} />
        </div>
      </div>
    </div>
  </section>
)

export default PhotosCard;
