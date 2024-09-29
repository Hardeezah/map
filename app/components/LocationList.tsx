import React, { useState } from "react";
import locationData from "../constant/output.json"

interface LocationData {
  id: number;
  Name: string;
  Status: string;
  "Census1991-11-26": string;
  "Census2006-03-21": string;
  "Projection2022-03-21": string;
}

const DataDisplay: React.FC = () => {
  // State to keep track of which location is toggled
  const [toggledId, setToggledId] = useState<number | null>(null);

  // Function to toggle the display of location data
  const toggleLocationData = (id: number) => {
    setToggledId(toggledId === id ? null : id);
  };

  return (
    <div>
      <h1 className="text-gray-800 font-bold text-2xl my-3">Kaduna State</h1>
      <p className="text-gray-500 text-sm"> 9,032,200 Population [2022] – Projection</p>
      <p className="text-gray-500 text-sm"> 45,061 km² Area</p>
      <p className="text-gray-500 text-sm">200.4/km² Population Density [2022]</p>
      <p className="text-gray-500 text-sm mb-5">2.5% Annual Population Change [2006 → 2022]</p>
      <ul>
        {locationData.map((location: LocationData) => (
          <li key={location.id}>
            <button onClick={() => toggleLocationData(location.id) } className="text-blue-400">
              {location.Name}
            </button>
            {toggledId === location.id && (
              <div className="text-sm text-gray-400 m-3">
                <p>{location.Status}</p>
                <p>Census 1991: {location["Census1991-11-26"]}</p>
                <p>Census 2006: {location["Census2006-03-21"]}</p>
                <p>Projection 2022: {location["Projection2022-03-21"]}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
