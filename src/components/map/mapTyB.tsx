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
import MapLoade from "../loade/MapLoade";
import {
  formatNumber,
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
  truncateText,
} from "../links";
import BuildingError from "../error/BuildingError";
import mapErrorSweet from "../sweetalert/mapErrorSweet";
import { PiInfinityDuotone, PiSpinnerGapDuotone } from "react-icons/pi";

// مكون لتحديد موقع المستخدم الحالي
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
        <p className="text-accent">أنت هنا</p>
      </Popup>
    </Marker>
  );
}

export default function MapTyB({ building }: { building: any[] }) {


  const [locations, setLocations] = useState<{ [key: string]: LatLngLiteral }>(
    {}
  );

  useEffect(() => {
    if (building && building.length) {
      const newLocations: { [key: string]: LatLngLiteral } = {};

      building.map((houss) => {
        const geoAddress = houss.property.address?.geo_address;
        if (geoAddress) {
          const coords = geoAddress.split(", ");
          if (coords.length === 2) {
            const lat = parseFloat(coords[0]) || 34.69498;
            const lng = parseFloat(coords[1]) || 36.7237;
            newLocations[houss.id] = { lat, lng };
          } else {
            console.warn(
              `تنسيق geo_address غير صالح للمنزل ID ${houss.id}: ${geoAddress}`
            );
          }
        }
      });

      setLocations(newLocations);
    }
  }, [building]);

  if (!locations || Object.keys(locations).length === 0) {
    return <MapLoade />;
  }

  return (
    <div className="z-30 mt-10 xl:mt-[-5px] font-cairo">
      <MapContainer
        className="w-full h-[300px] md:h-[60vh] xl:w-[62vw] xl:h-[68vh] z-10 rounded-md"
        center={{ lat: 34.6985, lng: 36.7237 }}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {building.map((houss) => {
          const location = locations[houss.id];
          if (!location) return null;
          let iconUrl;
          let imageSrc = ImagBuilding;

          switch (houss.property_type?.en) {
            case "apartment":
              iconUrl = Apartment.src;
              imageSrc = ImagApartment;
              break;
            case "commercialproperty":
              iconUrl = Commercialproperty.src;
              imageSrc = ImagCommercials;
              break;
            case "house":
              iconUrl = House.src;
              imageSrc = ImagHouse;
              break;
            case "building":
              iconUrl = BuildingIcon.src;
              imageSrc = ImagBuilding;
              break;
            default:
              iconUrl = Land.src;
              imageSrc = ImagLand;
              break;
          }
          const formattedNumber = formatNumber(houss.property.price);
          const truncatedText = truncateText(houss.property.description, 30);
          const truncatedTitle = truncateText(houss.property.title, 20);

          return (
            <Marker
              key={houss.property.id}
              icon={
                new L.Icon({
                  iconUrl: iconUrl,
                  iconRetinaUrl: iconUrl,
                  iconSize: [35, 35],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                })
              }
              position={location}
            >
              <Popup className="w-72 font-cairo">
                <Link
                  href={`/propertys/${houss.property.id}`}
                  className="flex flex-col font-cairo justify-center gap-0 items-center mx-[-10px]"
                >
                  <div className=" relative bg-body rounded-md h-24 min-w-32 flex flex-col mt-5 justify-center items-center ">
                    <Image
                      src={houss.property.photos?.[0]?.photo || imageSrc[0].photo}
                      width={150}
                      height={100}
                      alt="montagab"
                      className="h-full rounded-md z-20"
                    />
                    <PiSpinnerGapDuotone size={20} className="text-accent !z-0 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[-10px]">
                    <p className="text-lg xl:text-xl text-accent">
                      {truncatedTitle}
                    </p>
                    <div className="flex flex-row justify-between items-center mt-[-40px]">
                      <p className="text-white w-full text-center text-base font-thin">
                        {truncatedText}
                      </p>
                    </div>
                    <div className="bg-accent text-white text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                      {formattedNumber} ل.س
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
