import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/resources");
      setResources(response.data);
    } catch (error) {
      toast.error("Error fetching resources");
      console.error("Error fetching resources:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/resources/${id}`);
        setResources(resources.filter((resource) => resource._id !== id));
        toast.success("Resource deleted successfully");
      } catch (error) {
        toast.error("Error deleting resource");
        console.error("Error deleting resource:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Resources</h2>
        <Link to="/resourceform">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            New Resource
          </button>
        </Link>
      </div>

      <div className="w-full mx-auto mt-10 p-4 sm:p-6 shadow-lg bg-white rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6 sm:mb-9 text-center">Resource List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left">Project Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left">Resource Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden md:table-cell">Type</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden sm:table-cell">Quantity</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden md:table-cell">Supplier</th>
                <th className="px-2 sm:px-4 py-2 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <tr key={resource._id}>
                    <td className="px-2 sm:px-4 py-2 border-b">{resource.projectName}</td>
                    <td className="px-2 sm:px-4 py-2 border-b">{resource.resourceName}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden md:table-cell">{resource.type}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden sm:table-cell">{resource.quantity}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden md:table-cell">{resource.supplier}</td>
                    <td className="px-2 sm:px-4 py-2 border-b">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <Link to={`/resourceform/${resource._id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto">
                            Edit
                          </button>
                        </Link>
                        
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                          onClick={() => handleDelete(resource._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 border-b text-center">No resources found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Resources;