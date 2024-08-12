"use client";

import L from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import mapErrorSweet from "../sweetalert/mapErrorSweet";
import { PiMapPinLineDuotone } from "react-icons/pi";

// تابع لتحويل إحداثيات LatLng إلى سلسلة نصية
function formatLatLng(latLng: LatLngLiteral): string {
  const { lat, lng } = latLng;
  return `${lat}, ${lng}`;
}

// مكون لمعالجة أحداث الخريطة
function MapEventHandler({ setSelectedLocation, locateUser, onAddressSelect }: any) {
  const map = useMap();

  useMapEvents({
    click(e) {
      const formattedLocation = formatLatLng(e.latlng);
      setSelectedLocation(e.latlng);
      if (onAddressSelect) {
        onAddressSelect(formattedLocation); // إرسال الإحداثيات بشكل نصي
      }
    },
    locationfound(e) {
      const formattedLocation = formatLatLng(e.latlng);
      setSelectedLocation(e.latlng);
      if (onAddressSelect) {
        onAddressSelect(formattedLocation); // إرسال الإحداثيات بشكل نصي
      }

      // إعادة تعيين setView إلى false بعد تحديد الموقع
      map.setView(e.latlng, map.getZoom(), { animate: true });
    },
    locationerror() {
      mapErrorSweet();
    },
  });

  // استدعاء تحديد الموقع من خارج
  if (locateUser) {
    map.locate({
      setView: true,
      maxZoom: 16,
    });
  }

  return null;
}

export default function MapForProperty({ onAddressSelect }: any) {
  const [selectedLocation, setSelectedLocation] = useState<LatLngLiteral | null>(null);
  const [locateUser, setLocateUser] = useState(false);

  const handleLocateUser = () => {
    setLocateUser(true);
    setTimeout(() => setLocateUser(false), 100); // إعادة تعيين locateUser بعد فترة قصيرة
  };

  return (
    <div className="relative z-30 xl:mt-[-5px] font-cairo  !cursor-pointer">
      <MapContainer
        id="map"
        className="w-[100vw] h-[300px] md:w-[95vw] md:h-[60vh] xl:w-[90vw] xl:h-[68vh] z-10 rounded-md"
        center={{ lat: 34.6985, lng: 36.7237 }}
        zoom={7}
        scrollWheelZoom={false} // تأكد من أن التكبير/التصغير متاح
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className=" !cursor-pointer"
        />
        <MapEventHandler
          setSelectedLocation={setSelectedLocation}
          locateUser={locateUser}
          onAddressSelect={onAddressSelect} // تمرير onAddressSelect إلى MapEventHandler
        />
        {selectedLocation && (
          <Marker
            position={selectedLocation}
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
          />
        )}
      </MapContainer>

      <div
        onClick={handleLocateUser}
        className="absolute bottom-4 right-4 z-50 p-2 bg-accent text-white rounded-md shadow-md"
      >
        <PiMapPinLineDuotone size={22} />
      </div>
    </div>
  );
}
