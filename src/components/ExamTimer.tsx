import { useEffect, useState, useRef } from 'react';
import clockIcon from '../../public/clock-icon.svg';
import styles from './ExamTimer.module.css';

interface ExamTimerProps {
    initialSeconds: number;
}

function ExamTimer({ initialSeconds }: ExamTimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    // TODO: finish exam
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <time className={styles.timeContainer} dateTime={`PT${Math.floor(timeLeft / 60)}M${timeLeft % 60}S`}>
            <img src={clockIcon} alt="clock" />
            {formatTime(timeLeft)}
        </time>
    );
}

export default ExamTimer;