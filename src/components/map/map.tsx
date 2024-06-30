"use client";
import L from "leaflet";
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
import Image from "next/image";
import Link from "next/link";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import House from "../../../public/map/house.svg";
import BuildingIcon from "../../../public/map/building.svg";
import Apartment from "../../../public/map/flar.svg";
import Land from "../../../public/map/land.svg";
import Commercialproperty from "../../../public/map/store.svg";
import Tower from "../../../public/map/tower.svg";

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

export default function Map({ building }: { building: any[] }) {
  const [locations, setLocations] = useState<{ [key: string]: LatLngLiteral }>({});

  useEffect(() => {
    const newLocations: { [key: string]: LatLngLiteral } = {};

    if (building) {
      building.forEach((houss) => {
        if (houss.address.geo_address) {
          const [x, y] = houss.address.geo_address.split(", ");
          const lat = x === "x" ? 34.69498 : parseFloat(x);
          const lng = y === "y" ? 36.7237 : parseFloat(y);

          newLocations[houss.id] = { lat, lng };
        }
      });
    }

    setLocations(newLocations);
  }, [building]);

  if (!building) {
    return (
      <div className="mx-2 mt-5 md:ml-10">
        <div className="bg-sidpar flex justify-center items-center h-20 xl:h-40 rounded-md">
          <h1 className="text-2xl">جاري تحميل الخريطة...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="z-30 xl:mt-[-5px]">
      <MapContainer
        className="w-full h-[300px] md:w-[65vw] md:h-[60vh] xl:w-[62vw] xl:h-[68vh] z-10 rounded-md "
        center={{ lat: 34.6985, lng: 36.7237 }}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {building.map((houss) => {
          const location = locations[houss.id];

          if (!location) return null;

          let iconee;

          if (houss.property_object?.property_type?.en === "apartment") {
            iconee = Apartment;
          } else if (
            houss.property_object?.property_type?.en === "commercialproperty"
          ) {
            iconee = Commercialproperty;
          } else if (houss.property_object?.property_type?.en === "house") {
            iconee = House;
          } else if (houss.property_object?.property_type?.en === "building") {
            iconee = BuildingIcon;
          } else if (houss.property_object?.property_type?.en === "tower") {
            iconee = Tower;
          } else {
            iconee = Land;
          }

          return (
            <Marker
              key={houss.id}
              icon={
                new L.Icon({
                  iconUrl: iconee.src,
                  iconRetinaUrl: iconee.src,
                  iconSize: [35, 35],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                })
              }
              position={location}
            >
              <Popup className="w-72">
                <Link
                  href={`/buildings/${houss.id}`}
                  className="flex flex-col justify-center font-serif gap-0 items-center relative my[-25px] mt-[-20px]"
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
                      <p className="text-sidpar text-base font-semibold">
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
