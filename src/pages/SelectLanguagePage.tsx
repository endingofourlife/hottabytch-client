import styles from './SelectLanguagePage.module.css';
import {useUser} from "../providers/UserProvider.tsx";
import {useEffect, useState} from "react";
import {fetchAvailableLanguages} from "../api/languagesApi.ts";
import {patchProgrammingLanguage} from "../api/userApi.ts";
import {useNavigate} from "react-router-dom";
import LanguageItem from "../components/LanguageItem.tsx";
import ComputerIcon from '../../public/computer-icon.svg';
import {useQuery} from "@tanstack/react-query";
import LoaderSpinner from "../components/LoaderSpinner.tsx";

interface SelectedLanguage {
    name: string;
    languageId: number;
}

function SelectLanguagePage() {
    const navigate = useNavigate();

    const {isLoading: userLoading, changeProgrammingLanguage} = useUser();
    const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage>({
        name: 'JavaScript',
        languageId: 1
    });

    const {data: availableLanguages = [], isLoading: languagesLoading,  error} = useQuery({
        queryKey: ['available-languages'],
        queryFn: fetchAvailableLanguages,
    });


    useEffect(() => {
        if (availableLanguages.length > 0) {
            setSelectedLanguage({name: availableLanguages[0].name, languageId: availableLanguages[0].language_id});
        }
    }, [availableLanguages]);

    function handleLanguageSelect(languageId: number, languageName: string) {
        setSelectedLanguage({name: languageName, languageId});
    }

    async function handleContinue() {
        const response = await patchProgrammingLanguage(selectedLanguage.languageId);
        if (response){
            changeProgrammingLanguage(selectedLanguage.languageId, selectedLanguage.name);
            navigate("/");
        } else {
            alert('Error changing language');
        }
    }

    if (userLoading || languagesLoading) {
        return <LoaderSpinner />;
    }
    if (error) {
        return <div style={{color: "white"}}>Loading error. <strong>Try restart the app.</strong></div>;
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
                        <LanguageItem key={item.language_id} language={item} onSelect={handleLanguageSelect} selected={selectedLanguage.languageId} />
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