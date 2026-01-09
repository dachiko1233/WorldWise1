import { Link } from 'react-router-dom';
import Styles from '../components/CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';

export default function CityItem({ city }) {
  const { currentCity, deleteClick } = useCities();

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));

  const { cityName, emoji, date, id, position } = city;

  function handleClickDelete(e) {
    e.preventDefault();
    deleteClick(id);
  }

  return (
    <li>
      <Link
        className={`${Styles.cityItem} ${
          id === currentCity.id ? Styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={Styles.emoji}>{emoji}</span>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>{formatDate(date)}</time>

        <button className={Styles.deleteBtn} onClick={handleClickDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
