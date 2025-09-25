import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import LanguageItem from "../components/LanguageItem.tsx";
import starIcon from '../../public/images/star.svg';
import styles from './SelectLanguagePage.module.css';
import {useUser} from "../providers/UserProvider.tsx";
import {useEffect, useState} from "react";
import {fetchAvailableLanguages} from "../api/languagesApi.ts";
import {changeProgrammingLanguage} from "../api/userApi.ts";

function SelectLanguagePage() {
    const [availableLanguages, setAvailableLanguages] = useState<ProgrammingLanguage[]>([]);

    const {user, isLoading} = useUser();

    useEffect(() => {
        async function fetchLanguages(){
            const response = await fetchAvailableLanguages();
            setAvailableLanguages(response);
        }
        fetchLanguages();
    }, []);

    async function handleLanguageSelect(languageId: number) {
        const response = await changeProgrammingLanguage(user?.user_id || 0, languageId);
    }

    if (isLoading) {
        return <b>Loading...</b>;
    }

    return (
        <main className={styles.mainContainer}>
            <h1>Choose your language</h1>
            <p>Select a programming language to start your coding journey</p>
            <ul>
                {availableLanguages.map(language => (
                    <LanguageItem language={language} key={language.id} onSelect={handleLanguageSelect} />
                ))}
            </ul>
            <p>
                <img src={starIcon} alt="star icon" width="20px" height="20px"/>
                <strong>
                    The most popular for beginners: JavaScript & Python
                </strong>
            </p>
        </main>
    );
}

export default SelectLanguagePage;