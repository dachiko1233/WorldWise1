import { useNavigate, useSearchParams } from "react-router-dom";
import Styles from "./Map.module.css";
function Map() {
  const navigate =useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={Styles.mapContainer} onClick={() =>{navigate("form")}} >
      <h1>map</h1>
      <h1>
        
        position
        {lat} , {lng}
      </h1>

      <button onClick={() => {setSearchParams({lat:23 , lng:42})}} >Change pos</button>
    </div>
  );
}

export default Map;
