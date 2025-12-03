import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./components/AddSchool";
import ShowSchools from "./components/ShowSchools";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white py-4">
        <div className="container flex justify-center gap-8">
          <Link to="/" className="hover:text-gray-300 sm:text-lg">
            Schools List
          </Link>
          <Link to="/add" className="hover:text-gray-300 sm:text-lg">
            Add School
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ShowSchools />} />
        <Route path="/add" element={<AddSchool />} />
      </Routes>
    </Router>
  );
}

export default App;
