import Styles from './CityList.module.css';
import Spiner from '../components/Spinner';
import CityItem from '../components/CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

export default function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Spiner />;
  if (!cities.length)
    return (
      <Message message="Add you first city by cliking on a city on the map  " />
    );

  return (
    <ul className={Styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
