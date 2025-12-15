import styles from './RatingPreview.module.css';
import shockedIcon from '../../../public/rating-icon/shocked-icon.svg';

function RatingPreview() {
    return (
        <article className={`baseCard baseCard--hoverable ${styles.ratingPreviewContainer}`}>
            <img src={shockedIcon} alt="shocked-icon"/>
            <h3 className={`blockTitle blockTitle--sm`}>Rating</h3>
            <p className={`blockDescription`}>27 engineers</p>
        </article>
    );
}

export default RatingPreview;
