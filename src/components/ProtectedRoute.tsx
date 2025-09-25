import type {ReactNode} from "react";
import {useUser} from "../providers/UserProvider.tsx";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    requireLanguage?: boolean;
}

export default function ProtectedRoute({children, requireLanguage = true}: ProtectedRouteProps): ReactNode {
    const { isLoading, user } = useUser();

    if (isLoading) {
        return <b>Loading From Protected Route</b>
    }

    if (requireLanguage && !user?.active_language?.language_id){
        return <Navigate to={'/select-language'} replace />
    }
    return children;
}