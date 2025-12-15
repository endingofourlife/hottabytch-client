import classes from "./ProgressBar.module.css";

interface ProgressBarProps {
    progressPercent: number;
    gridArea?: string;
}

function ProgressBar({ progressPercent, gridArea }: ProgressBarProps) {
    return (
        <div className={classes.progressTrack} style={{ gridArea }}>
            <div
                className={classes.progressFill}
                style={{ width: `${progressPercent}%` }}
            />
        </div>
    );
}

export default ProgressBar;