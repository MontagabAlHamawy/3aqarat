import { PiRulerDuotone, PiMapPinDuotone } from "react-icons/pi";

export default function Land(Building: any) {
  const building = Building.building;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 xl:grid-cols-1 gap-x-1 gap-y-5 xl:gap-x-10">
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
      </div>
        <div className="flex gap-2 w-full">
          <div className="flex gap-1 ">
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
