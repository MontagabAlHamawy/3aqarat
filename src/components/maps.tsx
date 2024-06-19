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
import Land from "../../public/map/land.svg";
import Store from "../../public/map/store.svg";
import Tower from "../../public/map/tower.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { houses } from "./links";
// import { FlatInfo } from "./links";
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

export default function Maps({ building }: any) {
  let [locationX, setLocationX] = useState(null);
  let [locationY, setLocationY] = useState(null);

  useEffect(() => {
    if (building && building.address && building.address.geo_address) {
      const [x, y] = building.address.geo_address.split(", ");
      setLocationX(x);
      setLocationY(y);
    }
  }, [building]);
  const xloc = Number(locationX);
  const yloc = Number(locationY);

  var iconee;
  if (building.property_object.property_type === "apartment") {
    iconee = Flat;
  } else if (building.property_object.property_type === "store") {
    iconee = Store;
  } else if (building.property_object.property_type === "house") {
    iconee = House;
  } else if (building.property_object.property_type === "building") {
    iconee = Building;
  } else if (building.property_object.property_type === "land") {
    iconee = Land;
  } else if (building.property_object.property_type === "tower") {
    iconee = Tower;
  }
  
  return (
    <div className="z-30">
      <MapContainer
        className="w-[90vw] h-[300px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md "
        center={{ lat: 34.6985, lng: 36.7237 }}
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
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowSize: [41, 41],
            })
          }
          position={[xloc, yloc]}
        >
          <Popup className="w-72">
            <Link
              href={building.link}
              className="flex flex-row justify-center md:justify-start gap-4 items-center relative my[-25px] mt-[-20px]"
            >
              <Image
                // src={building.img}
                src={'/home/gg.jpg'}
                width={150}
                height={100}
                alt="montagab"
                className="mt-5 rounded-md"
              />
              <div className="flex flex-col justify-center items-center mt-[-10px]">
                <p className="text-lg xl:text-xl text-accent">
                  {building.title}
                </p>
                <div className="flex flex-row justify-between items-center mt-[-40px]">
                  <p className="text-sidpar text-base font-semibold">
                    {building.price}
                  </p>
                </div>
                <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                  {building.description}
                </div>
              </div>
            </Link>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
