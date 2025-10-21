import type {Question} from "../interfaces/Question.ts";

interface QuestionItemProps {
    question: Question;
    onClickAnswer: (question_id: number, answer_id: number) => void;
}

function QuestionItem({question, onClickAnswer}: QuestionItemProps) {
    return (
        <article>
            <h4>{question.text}</h4>

            <ul>
                {question.answers.map((answer) => (
                    <li key={answer.answer_id}>
                        <button onClick={() => onClickAnswer(question.question_id, answer.answer_id)}>
                            {answer.answer_text}
                        </button>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default QuestionItem;