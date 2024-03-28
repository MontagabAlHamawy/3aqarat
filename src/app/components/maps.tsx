// "use client";
// import { useState } from 'react';
import L from "leaflet";
// import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
// import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import House from '../../../public/map/house.svg'
import Building from '../../../public/map/building.svg'
import Flat from '../../../public/map/flar.svg'
import Land from '../../../public/map/land.svg'
import Store from '../../../public/map/store.svg'
import Tower from '../../../public/map/tower.svg'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Image from "next/image";
import { FlatInfo } from "./links";
import Link from "next/link";

// type Coordinate = [number, number];

export default function MapS() {
  // const [coord, setCoord] = useState<Coordinate>([34.6985, 36.7237]);

  // const SearchLocation = () => {
  //   return (
  //     <div className="search-location">
  //       <input type="text" placeholder="Search Location" />
  //     </div>
  //   );
  // };

  // const GetMyLocation = () => {
  //   const getMyLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         setCoord([position.coords.latitude, position.coords.longitude]);
  //       });
  //     } else {
  //       console.log('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   return (
  //     <div className="get-my-location">
  //       <button onClick={getMyLocation}>Get My Location</button>
  //     </div>
  //   );
  // };

  return (
    <div className="z-30">
      {/* <SearchLocation />
      <GetMyLocation /> */}
      <MapContainer
        className="w-[90vw] h-[300px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md"
        center={[34.6985, 36.7237]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {FlatInfo.map((houss, index) => {
          let xloc = Number(houss.location_x);
          let yloc = Number(houss.location_y);
          let iconee
          if(houss.type==='flat'){
            iconee= Flat
          }
          else if(houss.type==='store'){
            iconee= Store
          }
          else if(houss.type==='house'){
            iconee= House
          }
          else if(houss.type==='building'){
            iconee= Building
          }
          else if(houss.type==='land'){
            iconee= Land
          }
          else if(houss.type==='tower'){
            iconee= Tower
          }
          return (
            <Marker
              key={index}
              icon={
                new L.Icon({
                  iconUrl: iconee.src,
                  iconRetinaUrl: iconee.src,
                  iconSize: [40, 40],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                  // shadowUrl: MarkerShadow.src,
                  shadowSize: [41, 41],
                })
              }
              position={[xloc, yloc]}
            >
              <Popup className="w-72">
                <div
                  key={index}
                  className="flex flex-row justify-center md:justify-start gap-4 items-center relative my[-25px] mt-[-20px]"
                >
                  <Image
                    src={houss.image}
                    width={150}
                    height={100}
                    alt="montagab"
                    className="mt-5 rounded-md"
                  />
                  <div className="flex flex-col justify-center items-center mt-[-10px]">
                    <p className="text-lg xl:text-xl text-accent">
                      {houss.title}
                    </p>
                    <div className="flex flex-row justify-between items-center mt-[-40px]">
                      <p className="text-sidpar text-base font-semibold">
                        {houss.prise}
                      </p>
                    </div>
                    <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                      {houss.display}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
