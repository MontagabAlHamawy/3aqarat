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
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import House from "../../../public/map/house.svg";
import BuildingIcon from "../../../public/map/building.svg";
import Apartment from "../../../public/map/flar.svg";
import Land from "../../../public/map/land.svg";
import Commercialproperty from "../../../public/map/store.svg";
import Tower from "../../../public/map/tower.svg";
import { PiInfinityDuotone, PiMapPinDuotone } from "react-icons/pi";
import MapLoade from "../loade/MapLoade";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import mapErrorSweet from "../sweetalert/mapErrorSweet";

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
      mapErrorSweet();
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
  const [locations, setLocations] = useState<{ [key: string]: LatLngLiteral }>(
    {}
  );

  useEffect(() => {
    if (building) {
      const newLocations: { [key: string]: LatLngLiteral } = {};

      building.forEach((houss) => {
        if (houss.property.address && houss.property.address.geo_address) {
          const coords = houss.property.address.geo_address.split(", ");

          if (coords.length === 2) {
            const lat = parseFloat(coords[0]) || 34.69498; // Default latitude
            const lng = parseFloat(coords[1]) || 36.7237; // Default longitude

            newLocations[houss.property.id] = { lat, lng };
          } else {
            console.warn(
              `Invalid geo_address format for house ID ${houss.property.id}: ${houss.property.address.geo_address}`
            );
          }
        }
      });

      setLocations(newLocations);
    }
  }, [building]);

  if (!building) {
    return <MapLoade />;
  }

  return (
    <div className="z-30 mt-10 xl:mt-[-5px] font-cairo">
      <MapContainer
        className="w-full h-[300px] md:h-[60vh] xl:w-[62vw] xl:h-[68vh] z-10 rounded-md"
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
          const location = locations[houss.property.id];

          if (!location) return null;

          let iconee;
          let imagee = ImagBuilding;

          if (houss.property_type?.en === "apartment") {
            iconee = Apartment;
            imagee = ImagApartment;
          } else if (houss.property_type?.en === "commercialproperty") {
            iconee = Commercialproperty;
            imagee = ImagCommercials;
          } else if (houss.property_type?.en === "house") {
            iconee = House;
            imagee = ImagHouse;
          } else if (houss.property_type?.en === "building") {
            iconee = BuildingIcon;
            imagee = ImagBuilding;
          } else {
            iconee = Land;
            imagee = ImagLand;
          }

          return (
            <Marker
              key={houss.property.id}
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
              <Popup className="w-72 font-cairo">
                <Link
                  href={`/buildings/${houss.property.id}`}
                  className="flex flex-col font-cairo justify-center gap-0 items-center mx-[-20px]"
                >
                  <div className=" relative h-20 min-w-40 flex flex-col mb-5 justify-center items-center ">
                    <Image
                      src={
                        houss.property.photos.length !== 0
                          ? houss.property.photos[0].photo
                          : imagee[0].photo
                      }
                      width={150}
                      height={100}
                      alt="montagab"
                      className="mt-5 rounded-md z-20"
                    />
                    <PiInfinityDuotone size={20} className="text-accent !z-0 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[-10px]">
                    <p className="text-lg xl:text-xl text-accent">
                      {houss.property.title}
                    </p>
                    <div className="flex flex-row justify-between items-center mt-[-40px]">
                      <p className="text-white w-full text-center text-base font-thin">
                        {houss.property.description}
                      </p>
                    </div>
                    <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                      {houss.property.price} ل.س
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
