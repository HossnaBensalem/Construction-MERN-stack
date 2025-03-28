import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Menu } from "lucide-react";


function Layout({ children }) {

  //  ouverte ou non
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // pour  appareil mobile 
  const [isMobile, setIsMobile] = useState(false);

  // vérifier la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      //  largeur  considère  appareil mobile
      setIsMobile(window.innerWidth < 768);

      //  fermée par défaut
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        // est ouverte
        setSidebarOpen(true);
      }
    };

    // vérifier la taille de l'écran 
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fonction pour basculer l'état de la barre latérale (ouverte ou fermée)
  const toggleSidebar = (value) => {

    setSidebarOpen(typeof value === "boolean" ? value : !sidebarOpen);
  };

  return (
    <div className="app-layout relative">
     
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

      <div className={`transition-all duration-300 ${sidebarOpen && !isMobile ? "md:ml-64" : "ml-0"}`}>
     
        {!sidebarOpen && (
          <button 
            className="sidebar-toggle bg-blue-600 text-white p-2 rounded-md shadow-md m-4 flex items-center justify-center z-50" 
            onClick={() => toggleSidebar(true)}
          >
            <Menu size={24} />
          </button>
        )}

      
        <main 
          className={`main-content ${isMobile && sidebarOpen ? "opacity-50" : "opacity-100"}`} 
          onClick={() => isMobile && sidebarOpen && toggleSidebar(false)}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
