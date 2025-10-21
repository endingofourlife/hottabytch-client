import {useExam} from "../providers/ExamProvider.tsx";
import type {Question} from "../interfaces/Question.ts";
import {useUser} from "../providers/UserProvider.tsx";
import QuestionItem from "../components/QuestionItem.tsx";
import {getExamResults} from "../api/examApi.ts";
import {useState} from "react";
import FinishExamModal from "../components/FinishExamModal.tsx";

function ExamPage() {
    const {questions, onAnswerQuestion, reorderQuestions, sessionId} = useExam();
    const {user, updateStreakXP} = useUser();
    const [examResults, setExamResults] = useState<{xpEarned: number, successPercent: number} | null>(null);

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
            const newQuestionsOrder = updateQuestionsOrder(isCorrect);
            reorderQuestions(newQuestionsOrder);

            if (newQuestionsOrder.length === 0) {
                console.info("All questions answered. Exam completed.");
                await finishExam();
            }
        } catch (error) {
            console.error("Error answering question:", error);
        }
    }

    async function finishExam(){
        if (!sessionId) {
            console.error("Session ID is missing. Cannot finish exam.");
            return;
        }

        const {xp_earned, success_percent} = await getExamResults(sessionId);
        updateStreakXP(xp_earned);
        setExamResults({xpEarned: xp_earned, successPercent: success_percent});
    }

    if (questions.length === 0 && !examResults) {
        return <b>Loading exam questions...</b>;
    }

    return (
        <main>
            <section>
                <h3>{user?.active_language?.name}</h3>
                <time id="exam-timer" dateTime="PT15M30S">30:00</time>
                <progress value={0} max={questions.length}>
                    0/{questions.length}
                </progress>
            </section>

            <section>
                {questions.length > 0 && (
                    <QuestionItem question={questions[0]} onClickAnswer={handleAnswerQuestion} />
                )}
            </section>

            {examResults && (
                <FinishExamModal xpEarned={examResults.xpEarned} successPercent={examResults.successPercent} />
            )}
        </main>
    );
}

export default ExamPage;