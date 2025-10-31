import type {Question} from "../interfaces/Question.ts";
import styles from './QuestionItem.module.css';

interface QuestionItemProps {
    question: Question;
    onClickAnswer: (question_id: number, answer_id: number) => void;
    onNextQuestion: () => void;
    isCorrect?: boolean;
    selectedAnswerId?: number | null;
}

function QuestionItem({question, onClickAnswer, onNextQuestion, isCorrect, selectedAnswerId}: QuestionItemProps) {
    function getAnswerClass(answerId: number): string {
        if (answerId === selectedAnswerId) {
            return isCorrect ? styles.correctAnswer : styles.wrongAnswer;
        }
        return '';
    }

    const isAnswered = isCorrect !== undefined;

    return (
        <article className={styles.itemContainer}>
            <h4>{question.text}</h4>

            <ul className={styles.answerContainer}>
                {question.answers.map((answer) => (
                    <li key={answer.answer_id}>
                        <button
                            className={`${styles.answerBtn} ${getAnswerClass(answer.answer_id)}`}
                            onClick={() => onClickAnswer(question.question_id, answer.answer_id)}
                            disabled={isAnswered}
                        >
                            {answer.answer_text}
                        </button>
                    </li>
                ))}
            </ul>
            {isCorrect !== undefined && (
                <button className={styles.continueButton} onClick={onNextQuestion}>
                    Next Question
                </button>
            )}
        </article>
    );
}

export default QuestionItem;