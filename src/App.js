import React, {useState} from "react";
import logo from "./pin.svg";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as dagangLawar from "./location.json";
import "./App.css";

export const icon = new Icon({
  iconUrl: logo,
  iconSize: [30, 30],
});

function App() {
  const [popUp, setPopUp] = useState(null);

  return (
    <Map center={[-8.571246, 115.311178]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {dagangLawar.location.map(lawar => (
        <Marker 
          key={lawar.id} 
          position={[lawar.latitude, lawar.longitude]} 
          onClick={() => {
            setPopUp(lawar);
          }}
          icon={icon}
        />
      ))}

      {popUp && (
        <Popup 
          position={[popUp.latitude, popUp.longitude]}
          onClose={() => setPopUp(null)}
        >
          <h3>{popUp.name}</h3>
          <br/>
          <h4>{popUp.address}</h4>
          <br/>
          <p>{popUp.description}</p>
        </Popup>
      )}
    </Map>
  );
}

export default App;
