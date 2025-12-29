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
      school.name.toLowerCase().includes(val.toLowerCase())
    );
    setSchools(matchedSchools);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return loading ? (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="h-12 w-12 border-4 border-t-blue-600 rounded-full border-gray-200 animate-spin"></div>
    </div>
  ) : (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-(family-name:--font-roboto) w-full md:w-auto text-center md:text-left">
          Schools Directory
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search schools..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <select
            onChange={(e) => addFilter(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm"
          >
            <option value="All">All Cities</option>
            {[...new Set(allSchools.map((item) => item.city))].map(
              (city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {schools.map(({ id, name, address, city, image }) => (
          <div
            key={id}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
          >
            <div className="overflow-hidden h-40 sm:h-48 cursor-pointer">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="px-3 py-4 sm:p-5 flex-grow flex flex-col font-(family-name:--font-roboto)">
              <p className="text-sm text-[#13afc7]">{city}</p>
              <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-2 leading-tight">
                {name}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">
                {address}
              </p>
            </div>

            <button className="w-full bg-[#4CAE4C] hover:bg-[#449d44] text-white py-3 font-medium transition-colors duration-200 text-sm sm:text-base cursor-pointer">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {schools.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-lg">
          No schools found.
        </div>
      )}
    </div>
  );
}
