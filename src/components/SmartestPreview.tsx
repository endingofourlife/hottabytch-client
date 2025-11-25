import shockedFaceIcon from '../../public/smartest-icon/shocked-icon.svg';
import newIcon from '../../public/new-icon.svg';
import startArrowIcon from '../../public/smartest-icon/start-icon.svg';
import styles from './SmartestPreview.module.css';

function SmartestPreview() {
    function handleClick() {
        alert('Will be added soon!')
    }

    return (
        <button className={styles.smartestPreviewContainer} onClick={handleClick}>
            <img src={newIcon} alt="new-icon" className={styles.newIcon}/>
            <img src={shockedFaceIcon} alt="shocked-face-icon" className={styles.shockedFace}/>
            <h2>The smartest</h2>
            <p>27 online</p>
            <img src={startArrowIcon} alt="open-icon" className={styles.arrow}/>
        </button>
    );
}

export default SmartestPreview;