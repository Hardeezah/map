// /app/page.tsx
import dynamic from 'next/dynamic';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import Navbar from './components/Navbar';

// Dynamically load the map component (only works in the client)
const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default async function Home() {
  const overpassQuery = `
    [out:json];
    (
      node["amenity"="hospital"](10.3932,7.2654,10.7200,7.5823);  // Kaduna bounding box
      node["amenity"="school"](10.3932,7.2654,10.7200,7.5823);
    );
    out body;
  `;

  // Fetch data from Overpass API on the server side
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
  
  let locations = [];
  try {
    const response = await axios.get(url);
    locations = response.data.elements; // Extract the relevant data
  } catch (error) {
    console.error("Error fetching data from Overpass API", error);
  }

  // Pass the data to the client component (KadunaMap)
  return (
    <div className="flex">
      <Sidebar/>
      <Map locations={locations} />
    </div>
  );
}
