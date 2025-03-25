import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();  

  const initialValues = {
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref('startDate'), "End Date cannot be before Start Date"),
    budget: Yup.number().required("Budget is required").positive("Budget must be a positive number"),
  });

  const [project, setProject] = useState(initialValues);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:3000/api/projects/${id}`)
        .then((response) => {
          setProject(response.data);
        })
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/projects/${id}`, values);
        toast.success("Project updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/projects", values);
        toast.success("Project created successfully!");
      }
      navigate("/project");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-100 min-h-screen p-4">
      <div className="flex-grow max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">{id ? "Edit Project" : "Add New Project"}</h2>

        <Formik
          initialValues={project}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-4 bg-white p-4 sm:p-8 rounded-lg border border-blue-500 shadow-md">
              <div>
                <label className="block font-medium">Project Name</label>
                <Field
                  type="text"
                  name="projectName"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="projectName" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Start Date</label>
                  <Field
                    type="date"
                    name="startDate"
                    className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                    required
                  />
                  <ErrorMessage name="startDate" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <label className="block font-medium">End Date</label>
                  <Field
                    type="date"
                    name="endDate"
                    className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                    required
                  />
                  <ErrorMessage name="endDate" component="div" className="text-red-600 text-sm" />
                </div>
              </div>

              <div>
                <label className="block font-medium">Budget</label>
                <Field
                  type="number"
                  name="budget"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="budget" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Link to="/project" className="order-2 sm:order-1">
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition order-1 sm:order-2"
                >
                  {id ? "Update Project" : "Save Project"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectForm;