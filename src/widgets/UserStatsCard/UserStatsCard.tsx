import classes from "./UserStatsCard.module.css";
import {useUser} from "../../providers/UserProvider.tsx";
import ProgressBar from "../../shared/ui/ProgressBar/ProgressBar.tsx";

function UserStatsCard() {
    const { user, xpForNextLevel, newLevel } = useUser();
    const progressPercent = ((user?.xp ?? 0) / xpForNextLevel) * 100;

    return (
        <section className={`${classes.progressContainer} baseCard--hoverable`}>
            <dl>
                <dt>Streak</dt>
                <dd>
                    {user?.streak}
                </dd>
                <dt>Total XP</dt>
                <dd>
                    {user?.xp}
                </dd>
            </dl>
            <h2>Progress to <em>Level {newLevel}</em></h2>
            <p>{user?.xp}/{xpForNextLevel}</p>
            <ProgressBar progressPercent={progressPercent} gridArea={"progressBar"}/>
        </section>
    );
}

export default UserStatsCard;