"use client";
import L, { LatLngLiteral } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import House from "../../../public/map/house.svg";
import Building from "../../../public/map/building.svg";
import Apartment from "../../../public/map/flar.svg";
import Land from "../../../public/map/land.svg";
import Commercialproperty from "../../../public/map/store.svg";
import Tower from "../../../public/map/tower.svg";
import Image from "next/image";
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

export default function MapsComponent({ loc }: any) {
  const xloc = Number(loc[0]);
  const yloc = Number(loc[1]);
  const mapp = [
    {
      title: loc[3],
      description: loc[5],
      price: loc[4],
      link: loc[2],
      type: loc[6],
      display: "للبيع",
      location_x: loc[0],
      location_y: loc[1],
    },
  ];

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
        {mapp.map((houss, index) => {
          const xloc = Number(houss.location_x);
          const yloc = Number(houss.location_y);
          let iconee;
          if (houss.type === "apartment") {
            iconee = Apartment;
          } else if (houss.type === "commercialproperty") {
            iconee = Commercialproperty;
          } else if (houss.type === "house") {
            iconee = House;
          } else if (houss.type === "building") {
            iconee = Building;
          } else if (houss.type === "land") {
            iconee = Land;
          } else if (houss.type === "tower") {
            iconee = Tower;
          }

          return (
            <Marker
              key={index}
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
                  href={`/buildings/${houss.link}`}
                  key={index}
                  className="flex flex-col justify-center font-serif  gap-0 items-center relative my[-25px] mt-[-20px]"
                >
                  <Image
                    src="/home/gg.jpg"
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
                      <p className="text-sidpar  text-base font-semibold">
                        {houss.description}
                      </p>
                    </div>
                    <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                      {houss.price} ل.س
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
