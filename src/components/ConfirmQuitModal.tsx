import styles from './ConfirmQuitModal.module.css';
import {useEffect, useRef} from "react";

interface ConfirmQuitModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmQuitModal({ isOpen, onCancel, onConfirm }: ConfirmQuitModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        if (isOpen)
            dialog.showModal();
        else
            dialog.close();
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleCancel = (e: Event) => {
            e.preventDefault();
            onCancel();
        };

        dialog.addEventListener('cancel', handleCancel);
        return () => dialog.removeEventListener('cancel', handleCancel);
    }, [onCancel]);

    return (
        <dialog ref={dialogRef} className={styles.dialog}>
            <h3>Are you sure?</h3>
            <p>Your progress will be lost.</p>
            <div className={styles.buttons}>
                <button onClick={onCancel} className={styles.cancel}>Continue</button>
                <button onClick={onConfirm} autoFocus className={styles.confirm}>Quit</button>
            </div>
        </dialog>
    );
}

export default ConfirmQuitModal;