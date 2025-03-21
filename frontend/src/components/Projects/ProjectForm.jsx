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
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <div className="flex-grow p-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">Add New Project</h2>

        <Formik
          initialValues={project}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 bg-white p-8 rounded-lg border border-blue-500 shadow-md">
              <div>
                <label className="block font-medium">Project Name</label>
                <Field
                  type="text"
                  name="projectName"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="projectName" component="div" className="text-red-600" />
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

              <div>
                <label className="block font-medium">Budget</label>
                <Field
                  type="number"
                  name="budget"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="budget" component="div" className="text-red-600" />
              </div>

              <div className="flex justify-between">
                <Link to="/project">
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
                  Save Project
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