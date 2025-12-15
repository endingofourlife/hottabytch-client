import studyIcon from '../../public/study-icon.svg';
import styles from './StudyProgramPreview.module.css';

function StudyProgramPreview() {
    return (
        <article className={styles.studyProgramContainer}>
            <img src={studyIcon} alt="study-icon"/>
            <h2>Study Program</h2>
            <span>New</span>
            <p>You may start from scratch or select topic to improve</p>
        </article>
    );
}

export default StudyProgramPreview;