import type {Question} from "../interfaces/Question.ts";
import {baseApi} from "./baseApi.ts";

export interface ExamResponse {
    exam_id: number;
    title: string;
    description: string;
}

export interface StartExamResponse {
    session_id: string;
    questions: Question[];
}

export interface CheckAnswerResponse {
    question_id: number;
    is_correct: boolean;
}

interface ExamResultsResponse {
    accuracy: number,
    xp_earned: number,
    correct_answers: number,
    wrong_answers: number
}

export async function startExamRequest(examId: number | undefined): Promise<StartExamResponse> {
    const { data } = await baseApi.post<StartExamResponse>(
        `/exams/start`,
        {
            exam_id: examId,
        }
    );
    return data;
}

export async function checkAnswerRequest(session_id: string, question_id: number, answer_id: number): Promise<boolean> {
    const { data } = await baseApi.post<CheckAnswerResponse>("/exams/check", {
        session_id: session_id,
        question_id: question_id,
        answer_id: answer_id
    });
    return data.is_correct;
}

export async function getExamResults(exam_id: number): Promise<ExamResultsResponse> {
    const {data} = await baseApi.get(`/progress/finished/${exam_id}`);
    return data;
}