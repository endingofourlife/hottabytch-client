import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import classes from './LanguageItem.module.css';


interface LanguageItemProps {
    language: ProgrammingLanguage;
    onSelect: (languageId: number, languageName: string) => void;
    selected: number | null;
}

function LanguageItem({language, onSelect, selected}: LanguageItemProps) {
    function handleLanguageSelect(){
        onSelect(language.language_id, language.name);
    }
    let levelClass = classes.beginnerLevel;
    if (language.level.toLowerCase() === 'intermediate') {
        levelClass = classes.intermediateLevel;
    } else if (language.level.toLowerCase() === 'advanced') {
        levelClass = classes.advancedLevel;
    }

    return (
        <li className={classes.itemContainer}>
            <button
                className={`${classes.languageContainer} ${selected === language.language_id ? classes.selectedLanguage : ''}`}
                onClick={handleLanguageSelect}
                aria-label={`Select ${language.name} language`}
            >
                <img src={language.picture} alt={`${language.name} icon`}/>
                <h3>
                    {language.name}
                </h3>
                <em className={levelClass}>{language.level}</em>
                <p>{language.description}</p>
            </button>
        </li>
    );
}

export default LanguageItem;