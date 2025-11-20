import type {User} from "../interfaces/UserData.ts";
import {baseApi, setAuthToken} from "./baseApi.ts";
import type {ExamResponse} from "./examApi.ts";

interface FetchUserResponse {
    user: User;
    access_token: string;
}

export async function fetchUserData(userId: number, firstName: string, hash: string, timezone: string): Promise<User>{
    console.log('Fetching user data for userId:', userId, 'firstName:', firstName, 'timezone:', timezone);
    const {data} = await baseApi.post<FetchUserResponse>('/user/auth', {
        user_id: userId,
        first_name: firstName,
        timezone: timezone,
        hash: hash,
    });
    setAuthToken(data.access_token);
    return data.user;
}

interface ChangeProgrammingLanguageResponse {
    success: boolean;
}

export async function patchProgrammingLanguage(selectedLanguageId: number): Promise<boolean> {
    const {data} = await baseApi.patch<ChangeProgrammingLanguageResponse>(`/user/change-language`, {
        'language_id': selectedLanguageId
    });
    return data.success;
}

export async function getActualExam(): Promise<ExamResponse | null> {
    try {
        const { data } = await baseApi.get<ExamResponse>(
            `/user/actual-exam`
        );
        return data;
    } catch (error) {
        console.error("Error fetching actual exam:", error);
        return null;
    }
}