import { useContext, useState, useEffect, createContext } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:9000';

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data ...');
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert('There was an error loading data ...');
    } finally {
      setLoading(false);
    }
  }

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert('There was an error loading data ...');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('Cities context used outside the CitesProvaider ');
  return context;
}

export { CitiesProvider, useCities };
