import {useUser} from "../providers/UserProvider.tsx";

function ProfilePage() {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return <b>Loading...</b>;
    }

    return (
        <main>
            <section>
                <h2>{user?.first_name}</h2>
                <em>{user?.active_language?.name}</em>
                <button>Change Language</button>
            </section>
            <section>
                <h2>Statistics</h2>
                <dl>
                    <dt>Streak</dt>
                    <dd>{user?.streak} days</dd>
                    <dt>XP</dt>
                    <dd>{user?.xp} XP</dd>
                </dl>
            </section>
            <section>
                <h2>Today Exam</h2>
                <p>
                    {user?.is_streak
                        ? 'You have an exam today. Keep your streak alive!'
                        : 'You have done it. Take a break!'
                    }
                </p>
                {user?.is_streak ? (
                    <button>Start exam!</button>
                ) : (
                    <em>Completed</em>
                )}
            </section>
        </main>
    );
}

export default ProfilePage;