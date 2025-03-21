import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/projects/${id}`);
        setProjects(projects.filter((project) => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mx-auto">Projects</h2>
        <Link to="/projectform" className="mx-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Project
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-9 text-center">Project List</h2>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Project Name</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">End Date</th>
              <th className="px-4 py-2 border-b text-left">Budget</th>
              <th className="px-4 py-2 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-4 py-2 border-b">{project.projectName}</td>
                  <td className="px-4 py-2 border-b">{project.description}</td>
                  <td className="px-4 py-2 border-b">{project.startDate}</td>
                  <td className="px-4 py-2 border-b">{project.endDate}</td>
                  <td className="px-4 py-2 border-b">{project.budget}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex justify-center space-x-2">
                      <Link to={`/projectform/${project._id}`}>
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                          Edit
                        </button>
                      </Link>
                      
                      <Link to="/tasks">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Tasks
                        </button>
                      </Link>
                      
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  );
};

export default Projects;

