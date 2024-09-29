import React, { useState } from "react";
import locationData from "../constant/output.json";
import { RxCaretLeft } from "react-icons/rx";

interface HospitalData {
  public: number;
  private: number;
  total: number;
}

interface SchoolData {
  public: number;
  private: number;
  total: number;
}

interface LocationData {
  id: number;
  Name: string;
  Status: string;
  "Census1991-11-26": string;
  "Census2006-03-21": string;
  "Projection2022-03-21": string;
  totalHospitals: HospitalData;
  totalSchools: SchoolData;
}

const DataDisplay: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleBack = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="relative h-full w-full ">
      {selectedLocation ? (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-10 flex flex-col mb-3">
          <div className="flex gap-5 text-center mb-10">
            <button
              onClick={handleBack}
              className="text-blue-400 text-2xl font-extrabold"
            >
              <RxCaretLeft className="self-center" />
            </button>
            <div className="">
              <p className="text-[#6C6D73] text-[18px] font-bold">Back</p>
            </div>
          </div>
          <h2 className="text-gray-800 font-bold text-xl mb-2">{selectedLocation.Name}</h2>
          <p className="text-gray-400 mb-4">{selectedLocation.Status}</p>
          <p className="text-gray-500 text-sm mb-2">Census 1991: {selectedLocation["Census1991-11-26"]}</p>
          <p className="text-gray-500 text-sm mb-2">Census 2006: {selectedLocation["Census2006-03-21"]}</p>
          <p className="text-gray-500 text-sm mb-2">Projection 2022: {selectedLocation["Projection2022-03-21"]}</p>
          <p className="text-gray-500 text-sm mb-2">Total Hospitals: {selectedLocation.totalHospitals.total}</p>
          <p className="text-gray-500 text-sm mb-2">Public Hospitals: {selectedLocation.totalHospitals.public}</p>
          <p className="text-gray-500 text-sm mb-2">Private Hospitals: {selectedLocation.totalHospitals.private}</p>
          <p className="text-gray-500 text-sm mb-2">Total Schools: {selectedLocation.totalSchools.total}</p>
          <p className="text-gray-500 text-sm mb-2">Public Schools: {selectedLocation.totalSchools.public}</p>
          <p className="text-gray-500 text-sm mb-2">Private Schools: {selectedLocation.totalSchools.private}</p>
          <div className="flex-grow"></div>
        </div>
      ) : (
        <div>
          <h1 className="text-gray-800 font-bold text-2xl my-3">Kaduna State</h1>
          <p className="text-gray-500 text-sm">9,032,200 Population [2022] – Projection</p>
          <p className="text-gray-500 text-sm">45,061 km² Area</p>
          <p className="text-gray-500 text-sm">200.4/km² Population Density [2022]</p>
          <p className="text-gray-500 text-sm mb-5">2.5% Annual Population Change [2006 → 2022]</p>
          <ul>
            {locationData.map((location: LocationData) => (
              <li key={location.id} className="mb-1">
                <button
                  onClick={() => setSelectedLocation(location)}
                  className="text-blue-400"
                >
                  {location.Name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
