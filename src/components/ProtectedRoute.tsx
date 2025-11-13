import {type ReactNode, useEffect, useState} from "react";
import {useUser} from "../providers/UserProvider.tsx";
import {Navigate} from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
    requireLanguage?: boolean;
}

export default function ProtectedRoute({children, requireLanguage = true}: ProtectedRouteProps): ReactNode {
    const { isLoading, user } = useUser();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            console.log('User data loaded');
            const timer = setTimeout(() => setShowLoader(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (isLoading || showLoader) {
        return <LoaderSpinner />;
    }

    if (requireLanguage && !user?.active_language?.language_id){
        return <Navigate to={'/select-language'} replace />
    }
    return children;
}