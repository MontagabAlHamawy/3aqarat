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
import MapLoade from "../loade/MapLoade";
import mapErrorSweet from "../sweetalert/mapErrorSweet";
import {
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
} from "../links";
import { PiInfinityDuotone } from "react-icons/pi";

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

export default function HomeMap({ building }: { building: any[] }) {
  const [locations, setLocations] = useState<{ [key: string]: LatLngLiteral }>(
    {}
  );

  useEffect(() => {
    const newLocations: { [key: string]: LatLngLiteral } = {};

    building?.forEach((houss) => {
      if (houss.address.geo_address) {
        const [x, y] = houss.address.geo_address.split(", ");
        const lat = x === "x" ? 34.69498 : parseFloat(x);
        const lng = y === "y" ? 36.7237 : parseFloat(y);

        newLocations[houss.id] = { lat, lng };
      }
    });

    setLocations(newLocations);
  }, [building]);

  if (!building) {
    return <MapLoade />;
  }

  return (
    <div className="z-30 font-cairo">
      <MapContainer
        className="w-[98vw] h-[300px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md "
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
          let imagee = ImagBuilding;

          if (houss.property_object?.property_type?.en === "apartment") {
            iconee = Apartment;
            imagee = ImagApartment;
          } else if (
            houss.property_object?.property_type?.en === "commercialproperty"
          ) {
            iconee = Commercialproperty;
            imagee = ImagCommercials;
          } else if (houss.property_object?.property_type?.en === "house") {
            iconee = House;
            imagee = ImagHouse;
          } else if (houss.property_object?.property_type?.en === "building") {
            iconee = BuildingIcon;
            imagee = ImagBuilding;
          } else {
            iconee = Land;
            imagee = ImagLand;
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
              <Popup className="w-72 font-cairo ">
                <Link
                  href={`/buildings/${houss.id}`}
                  className="flex flex-col font-cairo justify-center gap-0 items-center mx-[-20px]"
                >

                  <div className=" relative h-20 min-w-40 flex flex-col mb-5 justify-center items-center ">
                    <Image
                      src={
                        houss.photos.length !== 0
                          ? houss.photos[0].photo
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
                    <p className="text-lg xl:text-xl text-accent font-family">
                      {houss.title}
                    </p>
                    <div className="flex flex-row justify-between items-center mt-[-40px]">
                      <p className="text-white w-full text-base text-center font-thin font-family font-cairo">
                        {houss.description}
                      </p>
                    </div>
                    <div className="bg-accent text-white font-family text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
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
