import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Tasks</h2>
        <Link to="/taskform">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            New Task
          </button>
        </Link>
      </div>

      <div className="w-full mx-auto mt-10 p-4 sm:p-6 shadow-lg bg-white rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6 sm:mb-9 text-center">Task List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left">Project</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden md:table-cell">Description</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden sm:table-cell">Start Date</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left hidden sm:table-cell">End Date</th>
                <th className="px-2 sm:px-4 py-2 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-2 sm:px-4 py-2 border-b">{task.projectName}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden md:table-cell">{task.description}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden sm:table-cell">{task.startDate}</td>
                    <td className="px-2 sm:px-4 py-2 border-b hidden sm:table-cell">{task.endDate}</td>
                    <td className="px-2 sm:px-4 py-2 border-b">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <Link to={`/taskform/${task._id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto">
                            Edit
                          </button>
                        </Link>
                        
                        <Link to="/resource">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto">
                            Resources
                          </button>
                        </Link>
                        
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                          onClick={() => deleteTask(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 border-b text-center">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;