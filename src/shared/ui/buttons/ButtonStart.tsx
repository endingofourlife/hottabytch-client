import arrowIcon from '../../../../public/shared/start-button-arrow-icon.svg';
import styles from './ButtonStart.module.css';

interface ButtonStartProps {
    handleClick: () => void;
    gridArea?: string;
}

function ButtonStart({ handleClick, gridArea }: ButtonStartProps) {
    return (
        <button onClick={handleClick} className={styles.buttonContainer} style={{gridArea}}>
            Start
            <img src={arrowIcon} alt="arrow-icon" />
        </button>
    );
}

export default ButtonStart;