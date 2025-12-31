import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();

  const [mapPosition, setmapPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');
  // const position = [51.505, -0.09] render()
  return (
    <div className={Styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={Styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
