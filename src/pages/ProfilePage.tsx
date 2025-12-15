import {useUser} from "../providers/UserProvider.tsx";
import classes from './ProfilePage.module.css';
import {useNavigate} from "react-router-dom";
import {getActualExam} from "../api/userApi.ts";
import UserStatsCard from "../widgets/UserStatsCard/UserStatsCard.tsx";
import DailyExamPreview from "../widgets/previews/DailyExamPreview.tsx";
import StudyProgramPreview from "../widgets/previews/StudyProgramPreview.tsx";
import RatingPreview from "../widgets/previews/RatingPreview.tsx";
import MyProfilePreview from "../widgets/previews/MyProfilePreview.tsx";
import ProfileHeader from "../widgets/headers/ProfileHeader.tsx";

function ProfilePage() {
    const navigate = useNavigate();
    const { isLoading } = useUser();

    function handleChangeLanguage(){
        navigate('/select-language');
    }

    async function handleShowExamRules(){
        setIsSubmitting(true);
        try {
            const response = await getActualExam();
            if (response){
                setActualExam(response);
                setIsModalOpen(true);
                return;
            } else {
                alert("Holy cow. You've done all exams 😱");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
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
            <ProfileHeader />
            <UserStatsCard />
            {/* Previews - Navigation */}
            <StudyProgramPreview />
            <div className={classes.previewsGrid}>
                <MyProfilePreview />
                <RatingPreview />
                <DailyExamPreview />
            </div>
        </main>
    );
}

export default ProfilePage;