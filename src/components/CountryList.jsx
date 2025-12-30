import Styles from './CountryList.module.css';
import Spiner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

export default function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Spiner />;
  if (!cities.length)
    return (
      <Message message="Add you first city by cliking on a city on the map  " />
    );
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.coountry).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={Styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
