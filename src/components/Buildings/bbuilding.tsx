import {
  PiRulerDuotone,
  PiCompassDuotone,
  PiBuildingsDuotone,
  PiMapPinDuotone,
  PiHouseDuotone,
} from "react-icons/pi";

export default function BBuilding(Building: any) {
  let building: any = Building.building;
  console.log(building);

  let direction = "";
  if (building.property_object.direction === "E") {
    direction = "شرقي";
  } else if (building.property_object.direction === "W") {
    direction = "غربي";
  } else if (building.property_object.direction === "N") {
    direction = "شمالي";
  } else if (building.property_object.direction === "S") {
    direction = "جنوبي";
  } else if (building.property_object.direction === "NW") {
    direction = "شمالي غربي";
  }
  return (
    // {buildin.map((building: any) => (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-1 gap-y-5 xl:gap-x-10">
        <div className="flex gap-2">
          <div className="flex justify-center gap-1 ">
            <p className="text-accent text-lg">
              <PiRulerDuotone />
            </p>
            المساحة الشقة:
          </div>
          <p className="text-gray-300">
            {building.area}M<sup>2</sup>
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center gap-1 ">
            <p className="text-accent text-lg">
              <PiHouseDuotone />
            </p>
            عدد الشقق:
          </div>
          <p className="text-gray-300">
            {building.property_object.num_of_apartments}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center gap-1 ">
            <p className="text-accent text-lg">
              <PiCompassDuotone />
            </p>
            الإتجاه:
          </div>
          <p className="text-gray-300">{direction}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex justify-center gap-1 ">
            <p className="text-accent text-lg">
              <PiBuildingsDuotone />
            </p>
            عدد الطوابق:
          </div>
          <p className="text-gray-300">
            {building.property_object.num_of_floors}
          </p>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex gap-1 ">
          <p className="text-accent text-lg">
            <PiMapPinDuotone />
          </p>
          الموقع:
        </div>
        <p className="text-gray-300 max-w-64  xl:max-w-96 ">
          {building.address.city.name} / {building.address.region} /{" "}
          {building.address.street} / {building.address.description}{" "}
        </p>
      </div>
    </div>
    // ))}
  );
}
