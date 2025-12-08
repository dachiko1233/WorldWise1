import Styles from "../components/CityItem.module.css";

export default function CityItem({ city }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const { cityName, emoji, date } = city;
  return (
    <li className={Styles.cityItem}>
      <span className={Styles.emoji}>{emoji}</span>
      <h3 className={Styles.name}>{cityName}</h3>
      <time className={Styles.date}>{formatDate(date)}</time>

      <button className={Styles.deleteBtn}>&times;</button>
    </li>
  );
}
