import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import styles from './SelectLanguagePage.module.css';
import {useUser} from "../providers/UserProvider.tsx";
import {useEffect, useState} from "react";
import {fetchAvailableLanguages} from "../api/languagesApi.ts";
import {patchProgrammingLanguage} from "../api/userApi.ts";
import {useNavigate} from "react-router-dom";
import LanguageItem from "../components/LanguageItem.tsx";
import ComputerIcon from '../../public/computer-icon.svg';

function SelectLanguagePage() {
    const [availableLanguages, setAvailableLanguages] = useState<ProgrammingLanguage[]>([]);
    const navigate = useNavigate();

    const {user, isLoading, changeProgrammingLanguage} = useUser();
    const [selectedLanguage, setSelectedLanguage] = useState({
        name: "JavaScript",
        languageId: 1
    });

    useEffect(() => {
        async function fetchLanguages(){
            const response = await fetchAvailableLanguages();
            setAvailableLanguages(response);
            setSelectedLanguage({name: response[0].name, languageId: response[0].id});
        }
        fetchLanguages();
    }, []);

    function handleLanguageSelect(languageId: number, languageName: string) {
        setSelectedLanguage({name: languageName, languageId});
    }
    async function handleContinue() {
        const response = await patchProgrammingLanguage(user?.user_id || 0, selectedLanguage.languageId);
        if (response){
            changeProgrammingLanguage(selectedLanguage.languageId, selectedLanguage.name);
            navigate("/");
        } else {
            alert('Error changing language');
        }
    }

    if (isLoading) {
        return <b>Loading...</b>;
    }

    return (
        <main className={styles.mainContainer}>
            <section className={styles.whatContainer}>
                <h2>
                    What is this mini-app for?
                </h2>
                <article className={styles.prosContainer}>
                    <p>
                        Take tests and check your programming knowledge right in telegram:
                    </p>
                    <ul className={styles.prosList}>
                        <li>
                            ./all popular programming languages
                        </li>
                        <li>
                            ./open source and free to use
                        </li>
                        <li>
                            ./instant result
                        </li>
                        <li>
                            ./efficient learning
                        </li>
                    </ul>
                </article>
            </section>

            <section className={styles.languagesContainer}>
                <h2>
                    <img src={ComputerIcon} alt="terminal-icon"/>
                    Choose language & take tests!
                </h2>
                <ul>
                    {availableLanguages.map(item => (
                        <LanguageItem language={item} onSelect={handleLanguageSelect} selected={selectedLanguage.languageId} />
                    ))}
                </ul>
            </section>

            <button className={styles.continueButton} onClick={handleContinue}>
                Continue with {selectedLanguage.name}
            </button>
        </main>
    );
}

export default SelectLanguagePage;