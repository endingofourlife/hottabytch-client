import type {ProgrammingLanguage} from "../interfaces/ProgrammingLanguage.ts";
import classes from './LanguageItem.module.css';
import PythonIcon from '../../public/python-logo-icon.svg';
import CSharpIcon from '../../public/Logo_C_sharp.svg';
import JSIcon from '../../public/javascript-logo-svgrepo-com.svg';

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
    const iconMap: Record<string, string> = {
        "python": PythonIcon,
        "javascript": JSIcon,
        "c#": CSharpIcon,
    };
    const picture = iconMap[language.name.toLowerCase()] || language.picture;
    console.log(picture);
    return (
        <li className={classes.itemContainer}>
            <button
                className={`${classes.languageContainer} ${selected === language.language_id ? classes.selectedLanguage : ''}`}
                onClick={handleLanguageSelect}
                aria-label={`Select ${language.name} language`}
            >
                <img src={picture} alt={`${language.name} icon`}/>
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