import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import {baseApi} from "./baseApi.ts";

export async function fetchAvailableLanguages(): Promise<ProgrammingLanguage[]>{
    const {data} = await baseApi.get('/language/available');
    return data;
}