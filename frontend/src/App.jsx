import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./components/AddSchool";
import ShowSchools from "./components/ShowSchools";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600 font-(family-name:--font-roboto) mb-2 sm:mb-0">
              EduDirectory
            </Link>
            <div className="flex gap-4 sm:gap-6 items-center">
              <Link 
                to="/" 
                className="font-medium text-sm sm:text-base hover:text-blue-600 transition-colors duration-200"
              >
                Schools List
              </Link>
              <Link 
                to="/add" 
                className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Add School
              </Link>
            </div>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<ShowSchools />} />
            <Route path="/add" element={<AddSchool />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;