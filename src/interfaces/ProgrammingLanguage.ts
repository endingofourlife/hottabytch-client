export interface ProgrammingLanguageBase {
    language_id: number;
    name: string;
}

export interface ProgrammingLanguage {
    id: number;
    name: string;
    description: string;
    popularity: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    picture: string;
}
