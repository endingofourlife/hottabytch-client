import axios from "axios";
import type {User} from "../interfaces/UserData.ts";

interface FetchUserResponse {
    user: User;
}

export async function fetchUserData(userId: number, firstName: string, hash: string, timezone: string): Promise<User>{
    console.log('Fetching user data for userId:', userId, 'firstName:', firstName, 'timezone:', timezone);
    const {data} = await axios.post<FetchUserResponse>('http://127.0.0.1:8000/api/user/auth', {
        user_id: userId,
        first_name: firstName,
        timezone: timezone,
        hash: hash
    });
    return data.user;
}