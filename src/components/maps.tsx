"use client";
import L from "leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import House from "../../public/map/house.svg";
import Building from "../../public/map/building.svg";
import Flat from "../../public/map/flar.svg";
import Flat2 from "../../public/map/flar.svg";
import Land from "../../public/map/land.svg";
import Store from "../../public/map/store.svg";
import Tower from "../../public/map/tower.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

function LocationMarker() {
  const [position, setPosition] = useState<LatLngLiteral | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      alert(
        "Couldn't access your location. Please enable location services and try again."
      );
      console.error(e);
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new L.Icon({
          iconUrl: MarkerIcon.src,
          iconRetinaUrl: MarkerIcon.src,
          iconSize: [21, 35],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
          shadowUrl: MarkerShadow.src,
          shadowSize: [41, 41],
        })
      }
    >
      <Popup>
        <p className="text-accent">You are here</p>
      </Popup>
    </Marker>
  );
}

export default function Maps({ loc }: any, {}) {
  // console.log(building);

  const xloc = Number(loc[0]);
  const yloc = Number(loc[1]);
  // console.log(xloc);
  // console.log(yloc);

  let iconee;
  // console.log(Flat2.src);

  switch (loc[6]) {
    case "apartment":
      iconee = Flat2;
      break;
    case "store":
      iconee = Store;
      break;
    case "house":
      iconee = House;
      break;
    case "building":
      iconee = Building;
      break;
    case "land":
      iconee = Land;
      break;
    case "tower":
      iconee = Tower;
      break;
    default:
      iconee = MarkerIcon;
  }

  return (
    <div className="z-30">
      <MapContainer
        className="w-[90vw] h-[300px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md"
        center={{ lat: xloc, lng: yloc }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Marker
          icon={
            new L.Icon({
              iconUrl: iconee.src,
              iconRetinaUrl: iconee.src,
              iconSize: [34, 34],
              iconAnchor: [17, 34],
              popupAnchor: [0, -34],
              shadowSize: [41, 41],
            })
          }
          position={[xloc, yloc]}
        >
          <Popup className="w-72">
            <Link
              href={`/buildings/${loc[2]}`}
              className="flex flex-row justify-center md:justify-start gap-4 items-center"
            >
              <Image
                src={"/home/gg.jpg"}
                width={150}
                height={100}
                alt="montagab"
                className="mt-5 rounded-md"
              />
              <div className="flex flex-col justify-center items-center mt-[-10px]">
                <p className="text-lg xl:text-xl text-accent">{loc[3]}</p>
                <div className="flex flex-row justify-between items-center mt-[-40px]">
                  <p className="text-sidpar text-base font-semibold">
                    {loc[4]}
                  </p>
                </div>
                <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                  {loc[5]}
                </div>
              </div>
            </Link>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
