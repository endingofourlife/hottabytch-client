import type {User} from "../interfaces/UserData.ts";
import {baseApi} from "./baseApi.ts";

interface FetchUserResponse {
    user: User;
}

export async function fetchUserData(userId: number, firstName: string, hash: string, timezone: string, pictureUrl: string): Promise<User>{
    console.log('Fetching user data for userId:', userId, 'firstName:', firstName, 'timezone:', timezone, 'pictureUrl:', pictureUrl);
    const {data} = await baseApi.post<FetchUserResponse>('/user/auth', {
        user_id: userId,
        first_name: firstName,
        timezone: timezone,
        hash: hash,
        picture_url: pictureUrl
    });
    return data.user;
}

interface ChangeProgrammingLanguageResponse {
    success: boolean;
}

export async function patchProgrammingLanguage(userId: number, selectedLanguageId: number): Promise<boolean> {
    const {data} = await baseApi.patch<ChangeProgrammingLanguageResponse>(`/user/${userId}/change-language`, {
        'language_id': selectedLanguageId
    });
    return data.success;
}