import type {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

interface FinishExamModalProps {
    xpEarned: number;
    successPercent: number;
}


function FinishExamModal({xpEarned, successPercent}: FinishExamModalProps) {
    const navigation = useNavigate();

    function handleClose(e: FormEvent){
        e.preventDefault();
        navigation('/');
    }

    return (
        <dialog open={true}>
            <h3>Exam results</h3>
            <dl>
                <dt>XP earned</dt>
                <dd>{xpEarned}</dd>

                <dt>Success percent</dt>
                <dd>{successPercent}%</dd>
            </dl>
            <menu>
                <button type={"button"} formMethod={"dialog"} onClick={handleClose}>
                    Go to profile
                </button>
            </menu>
        </dialog>
    );
}

export default FinishExamModal;