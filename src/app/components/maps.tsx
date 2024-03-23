"use client";

import L from "leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

type Coordinate = [number, number];
export default function Maps() {
  const [coord, setCoord] = useState<Coordinate>([34.6985, 36.7237]);

  const SearchLocation = () => {
    return (
      <div className="search-location">
        <input type="text" placeholder="Search Location" />
      </div>
    );
  };

  const GetMyLocation = () => {
    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoord([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    return (
      <div className="get-my-location">
        <button onClick={getMyLocation}>Get My Location</button>
      </div>
    );
  };

  return (
    <div className="z-30">
      {/* <SearchLocation />
            <GetMyLocation /> */}
      <MapContainer
        // style={{
        //   height: "68vh",
        //   width: "60vw",
        // }}
        className=" w-[90vw] h-[200px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md"
        center={coord}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
        icon={
          new L.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
          })
        }
        position={[34.6985, 36.7237]}>
          <Popup>
            <p className="text-accent"> A pretty CSS3 popup</p>
            <p className="text-accent">Easily customizable.</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
