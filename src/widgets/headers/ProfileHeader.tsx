import classes from "./ProfileHeader.module.css";
import SettingsIcon from "../../../public/settings-icon.svg";
import {useUser} from "../../providers/UserProvider.tsx";

function ProfileHeader() {
    const { user, level } = useUser();

    function handleChangeLanguage() {
        alert('Not implemented yet');
    }

    return (
        <header className={classes.headerContainer}>
            <img src={user?.pictureUrl} alt="profile-icon" loading={"eager"}/>
            <h2>{user?.first_name}</h2>
            <ul>
                <li>Level {level}</li>
                <li>{user?.active_language?.name}</li>
            </ul>
            <button onClick={handleChangeLanguage}>
                <img src={SettingsIcon} alt="settings-icon" className={classes.settingsIcon}/>
            </button>
        </header>
    );
}

export default ProfileHeader;