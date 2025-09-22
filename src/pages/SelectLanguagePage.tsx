import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import LanguageItem from "../components/LanguageItem.tsx";
import starIcon from '../../public/images/star.svg';
import styles from './SelectLanguagePage.module.css';
import {useUser} from "../providers/UserProvider.tsx";

function SelectLanguagePage() {
    const programmingLanguages: ProgrammingLanguage[] = [
        {
            id: 1,
            name: "JavaScript",
            popularity: 95,
            level: "Beginner",
            description: "Perfect for web development"
        },
        {
            id: 2,
            name: "Python",
            popularity: 90,
            level: "Beginner",
            description: "Great for data science & AI",
        },
        {
            id: 3,
            name: "Java",
            popularity: 85,
            level: "Intermediate",
            description: "Enterprise & Android apps",
        },
        {
            id: 4,
            name: "TypeScript",
            popularity: 80,
            level: "Intermediate",
            description: "JavaScript with superpowers",
        },
        {
            id: 5,
            name: "C++",
            popularity: 75,
            level: "Advanced",
            description: "System programming & games",
        },
        {
            id: 6,
            name: "Go",
            popularity: 70,
            level: "Intermediate",
            description: "Fast & efficient backend",
        }
    ];

    const {user, isLoading} = useUser();

    if (isLoading) {
        return <b>Loading...</b>;
    }

    return (
        <main className={styles.mainContainer}>
            <h1>Choose your language</h1>
            <p>Select a programming language to start your coding journey</p>
            <ul>
                {programmingLanguages.map(language => (
                    <LanguageItem language={language} key={language.id} />
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