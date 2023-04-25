import "./App.css";
import React, { useState } from "react";
import cities from "./cities.json";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
} from "react-leaflet";
import osm from "./osm-providers";
import L from "leaflet";

import { useRef } from "react";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: require("./marker.png"),
  iconSize: [20, 20],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
function SetViewOnClick({ animateRef, lat, long }) {
  const map = useMapEvent("click", (e) => {
    map.setView([51.505, -0.09], map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

function App() {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const animateRef = useRef(false);

  const handleMarkerClick = (event) => {
    const { lat, lng } = event.latlng;
    mapRef.current.panTo(new L.LatLng(lat, lng));
  };

  return (
    <>
      {/* <div className="row">
        <div className="col text-center">
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              {cities.map((city, idx) => (
                <Marker
                  position={[city.lat, city.lng]}
                  icon={markerIcon}
                  key={idx}
                  onClick={handleMarkerClick}>
                  <Popup>
                    <b>
                      {city.city}, {city.country}
                    </b>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div> */}
      <>
        <p>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                animateRef.current = !animateRef.current;
              }}
            />
            Animate panning
          </label>
        </p>
        <MapContainer center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetViewOnClick animateRef={animateRef} />
          <Marker position={[51.505, -0.09]} />
        </MapContainer>
      </>
    </>
  );
}

export default App;
