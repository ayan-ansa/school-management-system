import { useState, useEffect } from "react";
import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [query, setQuery] = useState("");
  const [allSchools, setAllSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/schools`);
      setSchools(response.data);
      setAllSchools(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addFilter = (selected) => {
    if (selected === "All") {
      setSchools(allSchools);
    } else {
      const selectedSchools = allSchools.filter(
        ({ city }) => city === selected
      );
      setSchools(selectedSchools);
    }
  };

  const handleSearch = (evt) => {
    const val = evt.target.value;
    setQuery(val);
    const matchedSchools = allSchools.filter((school) =>
      school.name.toLowerCase().includes(val)
    );
    setSchools(matchedSchools);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return loading ? (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="h-10 w-10 border-4 border-t-[#000] rounded-full border-[#bdbdbd] animate-spin"></div>
    </div>
  ) : (
    <div className="container mx-auto max-w-5xl sm:px-0 px-2 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-[1.7rem] font-bold mb-8 font-(family-name:--font-roboto)">
          Schools Directory
        </h1>
        <div className="border rounded-sm w-3xs">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search the school..."
            className="px-2 py-1 w-full outline-none"
          />
        </div>
        <select onChange={(e) => addFilter(e.target.value)}>
          <option>All</option>
          {allSchools.map(({ id, city }) => (
            <option value={city} key={id}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6 shadow-lg">
        {schools.map(({ id, name, address, city, image }) => (
          <div
            key={id}
            className="rounded-lg overflow-hidden cursor-pointer shadow transition-shadow duration-300"
          >
            <img
              src={`${BASE_URL}/schoolImages/${image}`}
              alt={name}
              className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
            />
            <div className="p-4 font-(family-name:--font-roboto)">
              <p className="text-[#11CDE8] text-[12px]">{city}</p>
              <h4 className="font-bold mt-2 mb-4 text-lg">{name}</h4>
              <p className="text-[#808080] mb-1">{address}</p>
            </div>
            <div className="bg-[#4CAE4C] text-center">
              <button className="text-sm font-medium text-white pb-2 cursor-pointer">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
