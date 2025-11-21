import {initDataState} from "@telegram-apps/sdk-react";
import {createContext, useContext, useEffect, useState} from "react";
import type {User} from "../interfaces/UserData.ts";
import {fetchUserData} from "../api/userApi.ts";
import defaultProgrammerIcon from '../../public/default-programmer-icon.png';

interface UserContextType {
    isLoading: boolean;
    user: User | null;
    changeProgrammingLanguage: (languageId: number, name: string) => void;
    updateUserStats: (earnedXP: number, accuracy: number) => void;
}

const UserContext = createContext<UserContextType>({
    isLoading: true,
    user: null,
    changeProgrammingLanguage: () => {},
    updateUserStats: () => {},
});

export function useUser (): UserContextType {
    return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function getUserTimezone(): string {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
            console.error('Could not determine timezone, defaulting to Europe/Kyiv', e);
            return 'Europe/Kyiv';
        }
    }

    function changeProgrammingLanguage(languageId: number, name: string){
        if (user) {
            setUser({...user, active_language: {language_id: languageId, name: name}});
        }
    }

    function updateUserStats(earnedXP: number, accuracy: number){
        if (user) {
            if (user.is_streak){
                setUser({...user, xp: user.xp + earnedXP, is_streak: true, exams_taken: user.exams_taken + 1, accuracy: accuracy});
            } else {
                setUser({...user, xp: user.xp + earnedXP, is_streak: true, streak: user.streak + 1, exams_taken: user.exams_taken + 1, accuracy: accuracy});
            }
        }
    }

    useEffect(() => {
        const initData = initDataState();

        if (!initData || !initData.user) {
            console.error('You must run this app inside Telegram');
            setIsLoading(false);
            return;
        }

        async function fetchData (){
            try {
                const user = await fetchUserData(
                    initData?.user?.id || 0,
                    initData?.user?.first_name || '',
                    initData?.hash || '',
                    getUserTimezone()
                );
                setUser({...user, pictureUrl: initData?.user?.photo_url || defaultProgrammerIcon});
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ isLoading, user, changeProgrammingLanguage, updateUserStats }}>
            {children}
        </UserContext.Provider>
    );
};