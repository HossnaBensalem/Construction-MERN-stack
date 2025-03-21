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
  };

  const validationSchema = Yup.object().shape({
    project: Yup.string().required("Project is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref('startDate'), "End Date cannot be before Start Date"),
  });

  const [task, setTask] = useState(initialValues);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:3000/api/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
    axios.get("http://127.0.0.1:3000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
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
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <div className="flex-grow p-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">{id ? "Edit Task" : "Add New Task"}</h2>

        <Formik
          initialValues={task}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 bg-white p-8 rounded-lg border border-blue-500 shadow-md">
              <div>
                <label className="block font-medium">Project</label>
                <Field 
                  as="select" 
                  name="project" 
                  className="w-full p-3 border border-blue-300 rounded-lg" 
                  required
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
                <ErrorMessage name="project" component="div" className="text-red-600" />
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Start Date</label>
                  <Field
                    type="date"
                    name="startDate"
                    className="w-full p-3 border border-blue-300 rounded-lg"
                    required
                  />
                  <ErrorMessage name="startDate" component="div" className="text-red-600" />
                </div>
                <div>
                  <label className="block font-medium">End Date</label>
                  <Field
                    type="date"
                    name="endDate"
                    className="w-full p-3 border border-blue-300 rounded-lg"
                    required
                  />
                  <ErrorMessage name="endDate" component="div" className="text-red-600" />
                </div>
              </div>

              <div className="flex justify-between">
                <Link to="/tasks">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {id ? "Update Task" : "Save Task"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;