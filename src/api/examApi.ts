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
    xp_earned: number;
    success_percent: number;
}

export async function getActualExam(userId: number | undefined): Promise<ExamResponse | null> {
    if (!userId) {
        console.error("User ID is missing");
        return null;
    }
    try {
        const { data } = await baseApi.get<ExamResponse>(
            `/exams/actual-exam/${userId}`
        );
        return data;
    } catch (error) {
        console.error("Error fetching actual exam:", error);
        return null;
    }
}

export async function startExamRequest(userId: number, examId: number | undefined): Promise<StartExamResponse> {
    const { data } = await baseApi.post<StartExamResponse>(
        `/exams/start`,
        {
            user_id: userId,
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

export async function getExamResults(session_id: string): Promise<ExamResultsResponse> {
    const {data} = await baseApi.get(`/exams/result/${session_id}`);
    return data;
}