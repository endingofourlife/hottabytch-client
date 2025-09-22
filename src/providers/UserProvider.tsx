import {initDataState} from "@telegram-apps/sdk-react";
import {createContext, useContext, useEffect, useState} from "react";
import type {User} from "../interfaces/UserData.ts";
import {fetchUserData} from "../api/userApi.ts";

interface UserContextType {
    isLoading: boolean;
    user: User | null;
}

const UserContext = createContext<UserContextType>({
    isLoading: true,
    user: null
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
                setUser(user);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ isLoading, user }}>
            {children}
        </UserContext.Provider>
    );
};