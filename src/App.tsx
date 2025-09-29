import SelectLanguagePage from "./pages/SelectLanguagePage.tsx";
import {HashRouter, Route, Routes} from "react-router-dom";
import { initDataState } from '@telegram-apps/sdk-react';
import {UserProvider} from "./providers/UserProvider.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Footer from "./components/Footer.tsx";
import ExamPage from "./pages/ExamPage.tsx";

function App() {
    const stateData = initDataState();

    if (!stateData || !stateData.user) {
        console.error('You must run this app inside Telegram');
        return <h1>App must be run inside Telegram</h1>
    }
    console.log(stateData);

  return (
      <UserProvider>
        <HashRouter>
            <Routes>
                <Route path={'/'} element={
                    <ProtectedRoute requireLanguage={true}>
                        <ProfilePage />
                    </ProtectedRoute>
                }/>
                <Route path={'/select-language'} element={
                    <ProtectedRoute requireLanguage={false}>
                        <SelectLanguagePage/>
                    </ProtectedRoute>
                }/>
                <Route path={'/start-exam'} element={
                    <ProtectedRoute>
                        <ExamPage />
                    </ProtectedRoute>
                }/>
            </Routes>
            <Footer />
        </HashRouter>
      </UserProvider>
  )
}

export default App
