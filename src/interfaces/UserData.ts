import type {ProgrammingLanguageBase} from "./ProgrammingLanguage.ts";

export interface User {
    user_id: number,
    first_name: string,
    streak: number,
    xp: number,
    active_language: ProgrammingLanguageBase | null,
    timezone: string,
    is_streak: boolean,
    pictureUrl: string,
}