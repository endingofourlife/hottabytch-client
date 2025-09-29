import type {Question} from "../interfaces/Question.ts";
import {baseApi} from "./baseApi.ts";

export interface ExamResponse {
    lesson_id: number;
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

export async function getActualExam(userId: number): Promise<ExamResponse> {
    const { data } = await baseApi.get<ExamResponse>(
        `/lessons/actual-lesson/${userId}`
    );
    return data;
}

export async function startExamRequest(userId: number, lessonId: number | undefined): Promise<StartExamResponse> {
    const { data } = await baseApi.post<StartExamResponse>(
        `/lessons/start`,
        {
            user_id: userId,
            lesson_id: lessonId,
        }
    );
    return data;
}

export async function checkAnswerRequest(session_id: string, question_id: number, answer_id: number): Promise<boolean> {
    const { data } = await baseApi.post<CheckAnswerResponse>("/lessons/check", {
        session_id: session_id,
        question_id: question_id,
        answer_id: answer_id
    });
    return data.is_correct;
}