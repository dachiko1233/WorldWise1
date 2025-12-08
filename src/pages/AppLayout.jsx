import Sidebar from "../components/Sidebar";
import Styles from "./AppLayout.module.css";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={Styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
