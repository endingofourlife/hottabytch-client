import classes from './ExamRulesModal.module.css';
import {useExam} from "../providers/ExamProvider.tsx";
import {useNavigate} from "react-router-dom";

interface ExamRulesModalProps{
    title: string;
    description: string;
    examId?: number;
    userId?: number;
    isOpen?: boolean;
    onClose: () => void;
}

function ExamRulesModal({title, description, examId, userId, onClose, isOpen = false} : ExamRulesModalProps) {
    const {startExam} = useExam();
    const navigate = useNavigate();

    function handleStartExam(event: React.FormEvent){
        event.preventDefault();
        if (!userId || !examId) {
            console.error("User ID or Exam ID is missing");
            return;
        }
        startExam(userId, examId);
        navigate('/exam');
    }

    if (!title) {
        return <p>Loading...</p>;
    }

    return (
        <dialog className={classes.overlay} open={isOpen}>
            <form method="dialog" className={classes.modal}>
                <h3>Are you sure?</h3>
                <dl>
                    <dt>Exam</dt>
                    <dd>{title}</dd>

                    <dt>Description</dt>
                    <dd>{description}</dd>
                </dl>

                <h4>Rules:</h4>
                <ul>
                    <li>You have 30 minutes to complete the exam.</li>
                    <li>In case of mistake, the question will be repeated at the end.</li>
                    <li>Do no use ChatGPT.</li>
                </ul>

                <menu>
                    <button type={"submit"} onClick={handleStartExam}>
                        Start
                    </button>
                    <button type={"button"} formMethod={"dialog"} onClick={onClose}>
                        Cancel
                    </button>
                </menu>
            </form>
        </dialog>

    );
}

export default ExamRulesModal;