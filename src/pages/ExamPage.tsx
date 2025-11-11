import {useExam} from "../providers/ExamProvider.tsx";
import type {Question} from "../interfaces/Question.ts";
import {useUser} from "../providers/UserProvider.tsx";
import QuestionItem from "../components/QuestionItem.tsx";
import {getExamResults} from "../api/examApi.ts";
import {useState} from "react";
import FinishExamModal from "../components/FinishExamModal.tsx";
import clockIcon from '../../public/clock-icon.svg';
import exitIcon from '../../public/exit-icon.svg';
import styles from './ExamPage.module.css';

function ExamPage() {
    const {questions, onAnswerQuestion, reorderQuestions, actualExamName, examId} = useExam();
    const {user, updateUserStats} = useUser();
    const [examResults, setExamResults] = useState<{xpEarned: number, successPercent: number, correctAnswers: number, wrongAnswers: number} | null>(null);

    const [isQuestionCorrect, setIsQuestionCorrect] = useState<boolean | undefined>(undefined);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

    /**
     * Update the order of questions based on whether the answer was correct.
     * if correct, remove the question from the list.
     * if incorrect, move the question to the end of the list.
     * @param isCorrect - whether the answer was correct or not
     */
    function updateQuestionsOrder(isCorrect: boolean): Question[]{
        const [currentQuestion, ...rest] = questions;

        if (isCorrect) {
            console.debug(`Question ${currentQuestion.question_id} answered correctly. Moving to next question.`);
            return rest;
        }
        console.debug(`Question ${currentQuestion.question_id} answered incorrectly. Re-adding to end of the queue.`);
        return [...rest, currentQuestion];
    }

    /**
     * Handles user answer logic
     * 1. Calls the API to verify correctness
     * 2. Updates the question queue based on correctness
     * 3. Checks if there are any questions left and finishes the exam
     */
    async function handleAnswerQuestion(question_id: number, answer_id: number): Promise<void>{
        if (questions.length === 0) {
            console.error("No questions available to answer.");
            return;
        }
        try {
            const isCorrect = await onAnswerQuestion(question_id, answer_id);
            setSelectedAnswerId(answer_id);
            console.log(isCorrect)
            setIsQuestionCorrect(isCorrect);
        } catch (error) {
            console.error("Error answering question:", error);
        }
    }

    async function handleNextQuestion(){
        if (isQuestionCorrect === undefined) {
            console.error("No answer has been provided yet.");
            return;
        }
        const newQuestionsOrder = updateQuestionsOrder(isQuestionCorrect);
        setIsQuestionCorrect(undefined);
        setSelectedAnswerId(null);
        reorderQuestions(newQuestionsOrder);

        if (newQuestionsOrder.length === 0) {
            console.info("All questions answered. Exam completed.");
            await finishExam();
        }
    }

    async function finishExam(){
        if (!examId) {
            console.error("Exam ID is missing. Something went wrong.");
            return;
        }

        const {xp_earned, correct_answers, wrong_answers, accuracy} = await getExamResults(examId);
        updateUserStats(xp_earned, accuracy);
        setExamResults({xpEarned: xp_earned, successPercent: accuracy, correctAnswers: correct_answers, wrongAnswers: wrong_answers});
    }

    if (questions.length === 0 && !examResults) {
        return <b>Loading exam questions...</b>;
    }

    return (
        <main className={styles.mainContainer}>
            <header className={styles.headerContainer}>
                <h2>{user?.active_language?.name}</h2>
                <h3>{actualExamName}</h3>
                <button>
                    <img src={exitIcon} alt="exit-icon"/>
                </button>
                <time id="exam-timer" dateTime="PT15M30S">
                    <img src={clockIcon} alt="clock-icon"/>
                    30:00
                </time>
                <progress value={0} max={questions.length}>
                    0/{questions.length}
                </progress>
            </header>

            <section className={styles.questionContainer}>
                {questions.length > 0 && (
                    <QuestionItem question={questions[0]}
                                  onClickAnswer={handleAnswerQuestion}
                                  onNextQuestion={handleNextQuestion}
                                  isCorrect={isQuestionCorrect}
                                  selectedAnswerId={selectedAnswerId}
                    />
                )}
            </section>

            {examResults && (
                <FinishExamModal xpEarned={examResults.xpEarned} successPercent={examResults.successPercent} correct={examResults.correctAnswers} wrong={examResults.wrongAnswers} />
            )}
        </main>
    );
}

export default ExamPage;