import {useUser} from "../providers/UserProvider.tsx";
import ProfileAnonymousIcon from '../../public/profile-anonymous-icon.jpg';
import SettingsIcon from '../../public/settings-icon.svg';
import FireIcon from '../../public/fire-icon.svg';
import classes from './ProfilePage.module.css';
import {useNavigate} from "react-router-dom";
// import {useState} from "react";
// import {type ExamResponse, getActualExam} from "../api/examApi.ts";
import StatisticsItem from "../components/StatisticsItem.tsx";
import accuracyIcon from '../../public/accuracy-icon.svg';
import examIcon from '../../public/exam-icon.svg';
import ExamRulesModal from "../components/ExamRulesModal.tsx";
import {type ExamResponse, getActualExam} from "../api/examApi.ts";
import {useState} from "react";

function ProfilePage() {
    const navigate = useNavigate();
    const { user, isLoading } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actualExam, setActualExam] = useState<ExamResponse | null>(null);
    const level = Math.floor(user?.xp ? user.xp / 100 : 0);
    const newLevel = level + 1;
    const xpForNewLevel = newLevel * 100;

    // TEST DATA
    const stats = [
        {pictureUrL: accuracyIcon, title: 'Accuracy', value: '87%'},
        {pictureUrL: examIcon, title: 'Exams Taken', value: 5},
    ]


    function handleChangeLanguage(){
        navigate('/select-language');
    }

    async function handleShowExamRules(){
        const response = await getActualExam(user?.user_id);
        if (response){
            setActualExam(response);
            setIsModalOpen(true);
        } else {
            alert('No exam available at the moment. Please try again later.');
        }
    }
    function handleCloseExamRules(){
        setIsModalOpen(false);
    }

    if (isLoading) {
        return <b>Loading...</b>;
    }

    return (
        <main className={classes.mainContainer}>
            <header className={classes.headerContainer}>
                <img src={user?.pictureUrl ? user.pictureUrl : ProfileAnonymousIcon} alt="profile-icon"/>
                <h2>{user?.first_name}</h2>
                <ul>
                    <li>Level {level}</li>
                    <li>{user?.active_language?.name}</li>
                </ul>
                <button onClick={handleChangeLanguage}>
                    <img src={SettingsIcon} alt="settings-icon" className={classes.settingsIcon}/>
                </button>
            </header>

            <section className={classes.progressContainer}>
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
                <p>{user?.xp}/{xpForNewLevel}</p>
                <progress value={user?.xp} max={xpForNewLevel} className={classes.progressBar}>
                    {Math.floor((user?.xp ?? 0) / xpForNewLevel * 100)}%
                </progress>
            </section>

            <article className={classes.quizContainer}>
                <img src={FireIcon} alt="fire-icon"/>
                <h2>Daily Quiz</h2>
                <p>Streak dying? Take a test!</p>
                <button onClick={handleShowExamRules}>Start</button>
            </article>

            <section className={classes.statsContainer}>
                {stats.map(item => (
                    <StatisticsItem pictureUrl={item.pictureUrL} title={item.title} value={item.value}/>
                ))}
            </section>


            {actualExam && (
                <ExamRulesModal
                    title={actualExam.title}
                    examId={actualExam.exam_id}
                    userId={user?.user_id}
                    onClose={handleCloseExamRules}
                    isOpen={isModalOpen}/>
            )}
        </main>
    );
}

export default ProfilePage;