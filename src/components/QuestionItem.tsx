import type {Question} from "../interfaces/Question.ts";
import styles from './QuestionItem.module.css';
import {separateCodeFromText} from "../shared/lib/separateCodeFromText.ts";
import { memo } from 'react';
import {PulseLoader} from "react-spinners";

interface QuestionItemProps {
    question: Question;
    onClickAnswer: (question_id: number, answer_id: number) => void;
    onNextQuestion: () => void;
    isCorrect?: boolean;
    selectedAnswerId?: number | null;
    isLoading?: boolean;
}

function QuestionItem({question, onClickAnswer, onNextQuestion, isCorrect, selectedAnswerId, isLoading}: QuestionItemProps) {
    const isAnswered = isCorrect !== undefined || isLoading;

    function getAnswerClass(answerId: number): string {
        if (answerId === selectedAnswerId) {
            return isCorrect ? styles.correctAnswer : styles.wrongAnswer;
        }
        return '';
    }

    const { text, code } = separateCodeFromText(question.text);

    return (
        <article className={styles.itemContainer}>
            <h4>{text}</h4>
            {code && (
                <pre>
                    <code>{code}</code>
                </pre>
            )}

            <ul className={styles.answerContainer}>
                {question.answers.map((answer) => (
                    <li key={answer.answer_id}>
                        <button
                            className={`${styles.answerBtn} ${getAnswerClass(answer.answer_id)}`}
                            onClick={() => onClickAnswer(question.question_id, answer.answer_id)}
                            disabled={isAnswered || isLoading}
                        >
                            {isLoading && selectedAnswerId === answer.answer_id ? <PulseLoader size={8}/> : answer.answer_text}
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

export default memo(QuestionItem);