export interface ProgrammingLanguageBase {
    language_id: number;
    name: string;
}

export interface ProgrammingLanguage {
    language_id: number;
    name: string;
    description: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    picture: string;
}
