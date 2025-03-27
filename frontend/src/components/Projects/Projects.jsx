import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/projects");
      setProjects(response.data);
    } catch (error) {
      toast.error("Error fetching projects");
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = () => {
      toast.dismiss();
      confirmDeleteProject(id);
    };

    toast(
      <div>
        <p>Are you sure you want to delete this project and all its associated tasks and resources?</p>
        <div className="flex justify-between mt-2">
          <button 
            onClick={confirmDelete}
            className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
          >
            OK
          </button>
        </div>
      </div>,
      {
        duration: Infinity
      }
    );
  };

  const confirmDeleteProject = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project, its tasks, and resources deleted successfully");
    } catch (error) {
      toast.error("Error deleting project");
      console.error("Error deleting project:", error.response?.data || error.message);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Projects</h2>
        <Link to="/projectform">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            New Project
          </button>
        </Link>
      </div>

      <div className="w-full mx-auto mt-10 p-4 sm:p-6 shadow-lg bg-white rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6 sm:mb-9 text-center">Project List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left">Project Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden md:table-cell">Description</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden sm:table-cell">Start Date</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden sm:table-cell">End Date</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden md:table-cell">Budget</th>
                <th className="px-2 sm:px-4 py-2 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project._id}>
                    <td className="px-2 sm:px-4 py-2 border-b">{project.projectName}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden md:table-cell">{project.description}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden sm:table-cell">{project.startDate}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden sm:table-cell">{project.endDate}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden md:table-cell">{project.budget}</td>
                    <td className="px-2 sm:px-4 py-2 border-b">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <Link to={`/projectform/${project._id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto">
                            Edit
                          </button>
                        </Link>
                        
                        <Link to="/tasks">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto">
                            Tasks
                          </button>
                        </Link>
                        
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                          onClick={() => handleDelete(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 border-b text-center">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;