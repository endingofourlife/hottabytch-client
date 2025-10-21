import classes from './StatisticsItem.module.css';

interface StatisticsItemProps {
    pictureUrl: string;
    title: string;
    value: number | string;
}

function StatisticsItem({ pictureUrl, title, value }: StatisticsItemProps) {
    return (
        <li className={classes.itemContainer}>
            <img src={pictureUrl} alt={`${title}-icon`}/>
            <h3>{value}</h3>
            <p>{title}</p>
        </li>
    );
}

export default StatisticsItem;