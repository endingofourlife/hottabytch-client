import examIcon from '../../../public/exam-icons/exam-preview-icon.svg';
import timeIcon from '../../../public/exam-icons/exam-preview-time-icon.svg';
import ButtonStart from "../../shared/ui/buttons/ButtonStart.tsx";
import styles from './DailyExamPreview.module.css';

function DailyExamPreview() {
    function handleClick() {
        alert('Not implemented yet');
    }
    return (
        <article className={`baseCard baseCard--hoverable ${styles.dailyExamContainer}`}>
            <img src={examIcon} alt="exam-icon"/>
            <time>
                30 min
                <img src={timeIcon} alt="time-icon"/>
            </time>
            <h3 className={`blockTitle`}>Daily Exam</h3>
            <p className={`blockDescription`}>25 questions</p>
            <ButtonStart handleClick={handleClick} gridArea={"btn"}/>
        </article>
    );
}

export default DailyExamPreview;