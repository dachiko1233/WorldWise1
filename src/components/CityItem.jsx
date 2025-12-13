import { Link } from "react-router-dom";
import Styles from "../components/CityItem.module.css";

export default function CityItem({ city }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const { cityName, emoji, date,id } = city;
  return (

    <li>
      <Link  className={Styles.cityItem} to={`${id}`}>
        <span className={Styles.emoji}>{emoji}</span>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>{formatDate(date)}</time>

        <button className={Styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
