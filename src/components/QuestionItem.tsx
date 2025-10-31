import type {Question} from "../interfaces/Question.ts";
import styles from './QuestionItem.module.css';

interface QuestionItemProps {
    question: Question;
    onClickAnswer: (question_id: number, answer_id: number) => void;
}

function QuestionItem({question, onClickAnswer}: QuestionItemProps) {
    return (
        <article className={styles.itemContainer}>
            <h4>{question.text}</h4>

            <ul className={styles.answerContainer}>
                {question.answers.map((answer) => (
                    <li key={answer.answer_id}>
                        <button
                            className={styles.answerBtn}
                            onClick={() => onClickAnswer(question.question_id, answer.answer_id)}>
                            {answer.answer_text}
                        </button>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default QuestionItem;