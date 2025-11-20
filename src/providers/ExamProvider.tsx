import type {Question} from "../interfaces/Question.ts";
import {createContext, type ReactNode, useContext, useState} from "react";
import {checkAnswerRequest, startExamRequest} from "../api/examApi.ts";
import {Outlet} from "react-router-dom";

interface ExamContextType {
    questions: Question[];
    startExam: (examId: number) => Promise<void>;
    onAnswerQuestion: (question_id: number, answer_id: number) => Promise<boolean>;
    reorderQuestions: (newQuestions: Question[]) => void;
    setActualExamName: (name: string) => void;
    actualExamName: string;
    examId: number | null;
}

const ExamContext = createContext<ExamContextType | null>(null);

export function ExamProvider({children} : {children: ReactNode}): ReactNode {
    const [sessionId, setSessionId] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [actualExamName, setActualExamName] = useState<string>('');
    const [examId, setExamId] = useState<number | null>(null);

    async function startExam(examId: number) {
        const {session_id, questions} = await startExamRequest(examId);
        console.debug('Starting exam with session ID:', session_id);
        setExamId(examId);
        setSessionId(session_id);
        setQuestions(questions);
    }

    async function onAnswerQuestion(question_id: number, answer_id: number): Promise<boolean> {
        console.debug('Answering question params: ', {sessionId, question_id, answer_id});
        return await checkAnswerRequest(sessionId, question_id, answer_id);
    }

    function reorderQuestions(newQuestions: Question[]) {
        setQuestions(newQuestions);
    }

    return <ExamContext.Provider
        value={{
            questions,
            startExam,
            onAnswerQuestion,
            reorderQuestions,
            actualExamName,
            setActualExamName,
            examId
        }}>
        {children}
    </ExamContext.Provider>;
}

export function useExam(): ExamContextType {
    const context = useContext(ExamContext);
    if (!context) {
        throw new Error("useExam must be used within an ExamProvider");
    }
    return context;
}

export function ExamProviderWrapper () {
    return <ExamProvider>
        <Outlet />
    </ExamProvider>
}