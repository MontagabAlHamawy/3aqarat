"use client";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
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
  formatNumber,
  ImagApartment,
  ImagBuilding,
  ImagCommercials,
  ImagHouse,
  ImagLand,
  truncateText,
} from "../links";
import { PiMapPinLineDuotone, PiSpinnerGapDuotone } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";

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

export default function HomeMap({ building }: { building: any[] }) {
  console.log("building: ", building);

  const [locations, setLocations] = useState<{ [key: string]: LatLngLiteral }>(
    {}
  );
  const [locateUser, setLocateUser] = useState(false);

  useEffect(() => {
    const newLocations: { [key: string]: LatLngLiteral } = {};

    building?.forEach((houss) => {
      if (houss.property.address && houss.property.address.geo_address) {
        const [x, y] = houss.property.address.geo_address.split(", ");
        const lat = x === "x" ? 34.69498 : parseFloat(x);
        const lng = y === "y" ? 36.7237 : parseFloat(y);

        newLocations[houss.property.id] = { lat, lng };
      }
    });

    setLocations(newLocations);
  }, [building]);

  if (!building) {
    return <MapLoade />;
  }

  const handleLocateUser = () => {
    setLocateUser(true);
    setTimeout(() => setLocateUser(false), 100); // إعادة تعيين locateUser بعد فترة قصيرة
  };

  return (
    <div className="relative z-30 mt-10 xl:mt-[-5px] font-cairo">
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
        <MapEventHandler locateUser={locateUser} />
        <LocationMarker />
        {building.map((houss) => {
          const location = locations[houss.property.id];

          if (!location) return null;

          let iconee;
          let imagee = ImagBuilding;

          if (houss.property_type?.en === "apartment") {
            iconee = Apartment;
            imagee = ImagApartment;
          } else if (
            houss.property_type?.en === "commercialproperty"
          ) {
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
          const formattedNumber = formatNumber(houss.property.price);
          const truncatedText = truncateText(houss.property.description, 30);
          const truncatedTitle = truncateText(houss.property.title, 20);

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
                  href={`/propertys/${houss.id}`}
                  className="flex flex-col font-cairo justify-center gap-0 items-center mx-[-20px]"
                >
                  <div className="relative bg-body rounded-md h-24 min-w-32 flex flex-col mt-5 justify-center items-center">
                    <Image
                      src={
                        houss.property.photos.length !== 0
                          ? houss.property.photos[0].photo
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
                    <p className="text-lg xl:text-xl text-accent">{truncatedTitle}</p>
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

      <div
        onClick={handleLocateUser}
        className="absolute bottom-4 right-4 z-50 p-2 bg-accent text-white rounded-md shadow-md cursor-pointer"
      >
        <PiMapPinLineDuotone size={22} />
      </div>
    </div>
  );
}
