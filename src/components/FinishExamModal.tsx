import {type FormEvent, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from './FinishExamModal.module.css';
import lightIcon from '../../public/lightIcon.svg';
import wrongIcon from '../../public/wrongIcon.svg';
import correctIcon from '../../public/correctIcon.svg';
import houseIcon from '../../public/homeIcon.png';

interface FinishExamModalProps {
    xpEarned: number;
    successPercent: number;
}


function FinishExamModal({xpEarned, successPercent}: FinishExamModalProps) {
    const navigation = useNavigate();

    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frameId: number;
        const startTime = Date.now();
        const duration = 2000;

        function animate() {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easedT = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast start, slow end
            const progress = easedT * successPercent;

            if (circleRef.current) {
                circleRef.current.style.setProperty('--progress', `${Math.round(progress)}%`);
            }

            if (elapsed < duration) {
                frameId = requestAnimationFrame(animate);
            }
        }

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [successPercent]);

    function handleClose(e: FormEvent){
        e.preventDefault();
        navigation('/');
    }

    return (
        <dialog open={true} className={styles.overlay}>
            <form className={styles.modal} method="dialog">
                <section className={styles.keepPracticing}>
                    <h3>Keep Practicing!</h3>
                    <p>Exam completed!</p>
                    <div ref={circleRef} className={styles.circle}>
                         <h4>{successPercent}%</h4>
                         <p>Accuracy</p>
                     </div>
                    <div className={styles.resultsContainer}>
                        <article className={styles.resultItem}>
                            <img src={lightIcon} alt="xp-count-icon"/>
                            <h4>+{xpEarned}</h4>
                            <p>XP</p>
                        </article>

                        <article className={styles.resultItem}>
                            <img src={correctIcon} alt="correct-answers-icon"/>
                            <h4>25</h4>
                            <p>Correct</p>
                        </article>

                        <article className={styles.resultItem}>
                            <img src={wrongIcon} alt="wrong-answers-icon"/>
                            <h4>5</h4>
                            <p>Wrong</p>
                        </article>
                    </div>
                </section>

                    <button type={"button"}
                            formMethod={"dialog"}
                            onClick={handleClose}
                            className={styles.navigation}
                    >
                        <img src={houseIcon} alt="house-icon"/>
                        Home
                    </button>

                <footer>
                    <p>Practice makes perfect. Try reviewing the topics and test again!</p>
                </footer>
            </form>
        </dialog>
    );
}

export default FinishExamModal;