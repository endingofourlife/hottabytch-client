import defaultIcon from '../../public/default-programmer-icon.png';
import styles from './TopPlayerItem.module.css';

interface TopPlayerItemProps {
    name: string;
    icon?: string | null;
    xp: number;
    streak: number;
    accuracy: number;
    place: number;
}

function TopPlayerItem({ name, icon, xp, streak, accuracy, place }: TopPlayerItemProps) {
    const placeClass = `top${place}Place`;
    return (
        <article className={styles.topPlayerContainer}>
            <img src={icon ? icon : defaultIcon} alt="profile-icon"/>
            <h3>{name}</h3>
            <dl>
                <dt>XP</dt>
                <dd>{xp}</dd>
                <dt>Streak</dt>
                <dd>{streak}</dd>
                <dt>Accuracy</dt>
                <dd>{accuracy}%</dd>
            </dl>
        </article>
    );
}

export default TopPlayerItem;