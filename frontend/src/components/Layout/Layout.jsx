import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Menu } from "lucide-react";

function Layout({ children }) {
  // تغيير الحالة الافتراضية إلى true لجعل القائمة الجانبية مفتوحة عند بدء التشغيل
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // التحقق من حجم الشاشة وتعديل حالة القائمة الجانبية
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // إغلاق القائمة تلقائيًا في وضع الهاتف المحمول
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // التحقق عند التحميل
    checkScreenSize();
    
    // الاستماع لتغييرات حجم النافذة
    window.addEventListener('resize', checkScreenSize);
    
    // تنظيف عند تفكيك المكون
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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