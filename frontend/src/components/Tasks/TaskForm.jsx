import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    project: "",
    description: "",
    startDate: "",
    endDate: "",
    projectName: "", // Important: Include projectName in your state
  };

  const [projects, setProjects] = useState([]);
  const [task, setTask] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    project: Yup.string().required("Project is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref('startDate'), "End Date cannot be before Start Date"),
  });

  useEffect(() => {
    // Load projects list
    axios.get("http://127.0.0.1:3000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Load task data if editing
    if (id) {
      axios.get(`http://127.0.0.1:3000/api/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/tasks/${id}`, values);
        toast.success("Task updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/tasks", values);
        toast.success("Task created successfully!");
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {id ? "Edit Task" : "New Task"}
      </h2>

      <Formik
        initialValues={task}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg border border-blue-200">
            {/* Project Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Project</label>
              <Field
                as="select"
                name="project"
                className={`w-full p-3 border rounded-lg ${errors.project && touched.project ? 'border-red-500' : 'border-blue-300'}`}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setFieldValue("project", selectedValue);
                  
                  // When project is selected, update projectName as well
                  const selectedProject = projects.find((project) => project._id === selectedValue);
                  setFieldValue("projectName", selectedProject ? selectedProject.projectName : "");
                }}
              >
                <option value="">Select a project</option>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))
                ) : (
                  <option value="">No projects available</option>
                )}
              </Field>
              <ErrorMessage name="project" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <Field
                as="textarea"
                name="description"
                className={`w-full p-3 border rounded-lg ${errors.description && touched.description ? 'border-red-500' : 'border-blue-300'}`}
                placeholder="Task details..."
                rows="3"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Dates - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <Field
                  type="date"
                  name="startDate"
                  className={`w-full p-3 border rounded-lg ${errors.startDate && touched.startDate ? 'border-red-500' : 'border-blue-300'}`}
                />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <Field
                  type="date"
                  name="endDate"
                  className={`w-full p-3 border rounded-lg ${errors.endDate && touched.endDate ? 'border-red-500' : 'border-blue-300'}`}
                />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <Link to="/tasks" className="w-full sm:w-auto">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full"
                >
                  Cancel
                </button>
              </Link>

              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                {id ? "Update Task" : "Save Task"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;