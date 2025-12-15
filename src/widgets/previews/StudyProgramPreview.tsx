import studyIcon from '../../../public/study-icon/study-icon.svg';
import startArrow from '../../../public/study-icon/study-preview-arrow-icon.svg';
import styles from './StudyProgramPreview.module.css';

function StudyProgramPreview() {
    return (
        <article className={`${styles.studyProgramContainer} baseCard baseCard--hoverable`}>
            <img src={studyIcon} alt="study-icon"/>
            <h3 className={`blockTitle`}>Study Program</h3>
            <p className={`blockDescription`}>You may start from scratch or select topic to improve</p>
            <button>
                <img src={startArrow} alt="start-icon"/>
            </button>
        </article>
    );
}

export default StudyProgramPreview;