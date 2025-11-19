import {useMemo} from "react";
import styles from './ExamProgressBar.module.css';

export default function ExamProgressBar({ answered, total }: { answered: number; total: number }) {
    const percent = useMemo(() => total > 0 ? (answered / total) * 100 : 0, [answered, total]);

    return (
        <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
    );
}