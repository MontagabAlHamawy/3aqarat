import {
  PiArmchairDuotone,
  PiRulerDuotone,
  PiCompassDuotone,
  PiBuildingsDuotone,
  PiParkDuotone,
  PiMapPinDuotone,
} from "react-icons/pi";

export default function House(Building: any) {
  const building = Building.building;
  let direction = "";
  if (building.property_object.direction === "E") {
    direction = "شرقي";
  }
  if (building.property_object.direction === "W") {
    direction = "غربي";
  }
  if (building.property_object.direction === "N") {
    direction = "شمالي";
  }
  if (building.property_object.direction === "S") {
    direction = "جنوبي";
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5 xl:gap-x-16">
        <div className="flex gap-2 ">
          <div className="flex justify-center  gap-1 ">
            <p className="text-accent text-lg">
              <PiRulerDuotone />
            </p>
            المساحة:
          </div>
          <p className="text-gray-300">
            {building.area}M<sup>2</sup>
          </p>
        </div>
        <div className="flex gap-2 ">
          <div className="flex justify-center  gap-1 ">
            <p className="text-accent text-lg">
              <PiArmchairDuotone />
            </p>
            عدد الغرف:
          </div>
          <p className="text-gray-300">
            {building.property_object.num_of_rooms}
          </p>
        </div>
        <div className="flex gap-2 ">
          <div className="flex justify-center  gap-1 ">
            <p className="text-accent text-lg">
              <PiCompassDuotone />
            </p>
            الإتجاه:
          </div>
          <p className="text-gray-300">{direction}</p>
        </div>
        <div className="flex gap-2 ">
          <div className="flex justify-center  gap-1 ">
            <p className="text-accent text-lg">
              <PiBuildingsDuotone />
            </p>
            عدد الطوابق:
          </div>
          <p className="text-gray-300">
            {building.property_object.num_of_floors}
          </p>
        </div>
        <div className="flex gap-2 ">
          <div className="flex justify-center  gap-1 ">
            <p className="text-accent text-lg">
              <PiParkDuotone />
            </p>
            الحديقة:
          </div>
          <p className="text-gray-300">
            {building.property_object.garden_area}M<sup>2</sup>
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-2 sm:w-full">
        <div className="flex justify-start   gap-1 ">
          <p className="text-accent text-lg">
            <PiMapPinDuotone />
          </p>
          الموقع:
        </div>
        <p className="text-gray-300 max-w-64 xl:max-w-96 ">
          {building.address.city.name} / {building.address.region} /{" "}
          {building.address.street} / {building.address.description}{" "}
        </p>
      </div>
    </div>
  );
}
