import {
  useContext,
  useEffect,
  createContext,
  useReducer,
  useCallback,
} from 'react';

const CitiesContext = createContext();

const STORAGE_KEY = 'worldwise_cities';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = {
  cities: loadFromStorage(),
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action types');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  function createCity(newCity) {
    const cityWithId = { ...newCity, id: Date.now() };
    dispatch({ type: 'city/created', payload: cityWithId });
  }

  function deleteClick(id) {
    dispatch({ type: 'city/deleted', payload: id });
  }

  const getCity = useCallback(
    function getCity(id) {
      if (Number(id) === currentCity.id) return;
      const city = cities.find((c) => c.id === Number(id));
      if (city) {
        dispatch({ type: 'city/loaded', payload: city });
      } else {
        dispatch({ type: 'rejected', payload: 'City not found.' });
      }
    },
    [currentCity.id, cities],
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteClick,
      }}
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
