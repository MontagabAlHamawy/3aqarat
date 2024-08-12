"use client";
import L, { LatLngLiteral } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
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
import {
  formatNumber,
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
  truncateText,
} from "../links";
import mapErrorSweet from "../sweetalert/mapErrorSweet";
import { PiMapPinLineDuotone, PiSpinnerGapDuotone } from "react-icons/pi";

// مكون لمعالجة أحداث الخريطة
function MapEventHandler({ locateUser }: { locateUser: boolean }) {
  const map = useMap();
  const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(null);

  useEffect(() => {
    if (locateUser) {
      map.locate({ setView: true, maxZoom: 16 });
    }
  }, [locateUser, map]);

  useMapEvents({
    locationfound(e) {
      setUserPosition(e.latlng);
      map.setView(e.latlng, map.getZoom(), { animate: true });
    },
    locationerror() {
      mapErrorSweet();
    },
  });

  return userPosition ? (
    <Marker
      position={userPosition}
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
  ) : null;
}

// مكون لتحديد الموقع الحالي للمستخدم
function LocationMarker() {
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

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
  const [locateUser, setLocateUser] = useState(false);
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
      photos: loc[7],
    },
  ];

  const handleLocateUser = () => {
    setLocateUser(true);
    setTimeout(() => setLocateUser(false), 100); // إعادة تعيين locateUser بعد فترة قصيرة
  };

  return (
    <div className="relative z-30 font-cairo">
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
        <MapEventHandler locateUser={locateUser} />
        <LocationMarker />
        {mapp.map((houss, index) => {
          const xloc = Number(houss.location_x);
          const yloc = Number(houss.location_y);
          let iconee;
          let imagee = ImagBuilding;

          if (houss.type === "apartment") {
            iconee = Apartment;
            imagee = ImagApartment;
          } else if (houss.type === "commercialproperty") {
            iconee = Commercialproperty;
            imagee = ImagCommercials;
          } else if (houss.type === "house") {
            iconee = House;
            imagee = ImagHouse;
          } else if (houss.type === "building") {
            iconee = Building;
            imagee = ImagBuilding;
          } else {
            iconee = Land;
            imagee = ImagLand;
          }
          const formattedNumber = formatNumber(houss.price);
          const truncatedText = truncateText(houss.description, 30);
          const truncatedTitle = truncateText(houss.title, 20);

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
              <Popup className="w-72 font-cairo">
                <Link
                  href={`/propertys/${houss.link}`}
                  className="flex flex-col font-cairo justify-center gap-0 items-center mx-[-10px]"
                >
                  <div className="relative bg-body rounded-md h-24 min-w-32 flex flex-col mt-5 justify-center items-center">
                    <Image
                      src={
                        houss.photos.length !== 0
                          ? houss.photos[0].photo
                          : imagee[0].photo
                      }
                      width={150}
                      height={100}
                      alt="montagab"
                      className="h-full rounded-md z-20"
                    />
                    <PiSpinnerGapDuotone size={20} className="text-accent !z-0 absolute animate-waving-hand2 opacity-100 transform translate-y-0 duration-100" />
                  </div>
                  <div className="flex flex-col justify-center items-center mt-[-10px]">
                    <p className="text-lg xl:text-xl text-accent font-family">
                      {truncatedTitle}
                    </p>
                    <div className="flex flex-row justify-between items-center mt-[-40px]">
                      <p className="text-white w-full text-base text-center font-thin font-family font-cairo">
                        {truncatedText}
                      </p>
                    </div>
                    <div className="bg-accent text-white font-family text-sm xl:text-base px-2 py-1 mt-[-15px] rounded">
                      {formattedNumber} ل.س
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div
        onClick={handleLocateUser}
        className="absolute bottom-4 right-4 z-50 p-2 bg-accent text-white rounded-md shadow-md cursor-pointer"
      >
        <PiMapPinLineDuotone size={22} />
      </div>
    </div>
  );
}
