import React from "react";
import { Home, CheckCircle, Settings, LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isMobile = false }) => {
  return (
    <div className="sidebar-container">
      {/* خلفية داكنة تظهر خلف القائمة الجانبية في وضع الهاتف المحمول */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
      
      {/* القائمة الجانبية */}
      <div 
        className={`fixed top-0 left-0 h-full bg-blue-800 text-white w-64 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "z-40 shadow-lg" : "z-30"}`}
      >
        <div className="p-4 border-b border-blue-700 flex justify-between items-center">
          <span className="text-lg font-bold">ConstructionXpert</span>
          <button onClick={() => toggleSidebar(false)} className="text-white focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4 flex flex-col space-y-2">
          <Link 
            to="/project" 
            className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition" 
            onClick={() => isMobile && toggleSidebar(false)}
          >
            <Home size={24} />
            <span>Projects</span>
          </Link>
          <Link 
            to="/tasks" 
            className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition" 
            onClick={() => isMobile && toggleSidebar(false)}
          >
            <CheckCircle size={24} />
            <span>Tasks</span>
          </Link>
          <Link 
            to="/resource" 
            className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 transition" 
            onClick={() => isMobile && toggleSidebar(false)}
          >
            <Settings size={24} />
            <span>Resources</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-blue-700">
          <Link 
            to="/logout" 
            className="flex items-center p-2 text-white hover:bg-blue-700 transition" 
            onClick={() => isMobile && toggleSidebar(false)}
          >
            <LogOut size={24} />
            <span className="ml-2">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;