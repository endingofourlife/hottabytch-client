import classes from './ExamRulesModal.module.css';
import {useExam} from "../providers/ExamProvider.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {PulseLoader} from "react-spinners";

interface ExamRulesModalProps{
    title: string;
    examId?: number;
    userId?: number;
    isOpen?: boolean;
    onClose: () => void;
}

function ExamRulesModal({title, examId, onClose, isOpen = false} : ExamRulesModalProps) {
    const {startExam, setActualExamName} = useExam();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleStartExam(event: React.FormEvent){
        event.preventDefault();
        setIsSubmitting(true);
        if (!examId) {
            console.log(examId);
            console.error("Exam ID is missing");
            return;
        }
        try {
            setActualExamName(title);
            await startExam(examId);
            navigate('/exam');
            return;
        } catch(err){
            console.error(err);
            alert('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!title) {
        return <p>Loading...</p>;
    }

    return (
        <dialog className={classes.overlay} open={isOpen}>
            <form method="dialog" className={classes.modal}>
                <h3>{title}</h3>

                <h4>Rules</h4>
                <ol>
                    <li>Do not use ChatGPT</li>
                    <li>You have 30 minutes to complete the entire exam.</li>
                    <li>In case of a mistake, the question will be repeated at the end of the exam.</li>
                    <li>You must attempt every question.</li>
                </ol>

                <menu>
                    <button type={"submit"} onClick={handleStartExam}>
                        {isSubmitting ? <PulseLoader color={"black"} size={8}/> : 'Start'}
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