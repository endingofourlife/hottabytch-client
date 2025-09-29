import type {Answer} from "./Answer.ts";

export interface Question {
    question_id: number;
    text: string;
    answers: Answer[];
}