import React from "react";
import { Home, CheckCircle, Settings } from "lucide-react"; // الأيقونات
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-800 shadow-md h-20"> {/* زيادة سمك الشريط */}
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
          <div className="flex space-x-4 text-white">
            <Link to="/project">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition">
                <Home size={30} />
                <span>Projects</span>
              </button>
            </Link>

            <Link to="/tasks">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition">
                <CheckCircle size={30} />
                <span>Tasks</span>
              </button>
            </Link>

            <Link to="/resource">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition">
                <Settings size={30} />
                <span>Resources</span>
              </button>
            </Link>
          </div>

          {/* زر تسجيل الخروج */}
          <Link to="/logout">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;