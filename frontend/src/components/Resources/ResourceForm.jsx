import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResourceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const initialValues = {
    project: "",
    resourceName: "",
    type: "",
    quantity: "",
    supplier: "",
  };

  const validationSchema = Yup.object().shape({
    project: Yup.string().required("Project is required"),
    resourceName: Yup.string().required("Resource Name is required"),
    type: Yup.string().required("Resource Type is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number")
      .integer("Quantity must be a whole number"),
    supplier: Yup.string().required("Supplier is required"),
  });

  useEffect(() => {
    // Fetch projects
    axios.get("http://127.0.0.1:3000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Fetch existing resource if editing
    if (id) {
      axios.get(`http://127.0.0.1:3000/api/resources/${id}`)
        .then((response) => {
          const resourceData = response.data;
          // Update initial values with fetched data
          initialValues.project = resourceData.project;
          initialValues.resourceName = resourceData.resourceName;
          initialValues.type = resourceData.type;
          initialValues.quantity = resourceData.quantity;
          initialValues.supplier = resourceData.supplier;
        })
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      // Find the selected project name
      const selectedProject = projects.find((p) => p._id === values.project);
      const resourceData = {
        ...values,
        projectName: selectedProject ? selectedProject.projectName : "",
      };

      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/resources/${id}`, resourceData);
        toast.success("Resource updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/resources", resourceData);
        toast.success("Resource created successfully!");
      }
      navigate("/resource");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-100 min-h-screen p-4">
      <div className="flex-grow max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          {id ? "Edit Resource" : "Add New Resource"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-4 bg-white p-4 sm:p-8 rounded-lg border border-blue-500 shadow-md">
              <div>
                <label className="block font-medium">Project</label>
                <Field
                  as="select"
                  name="project"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="project" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Resource Name</label>
                <Field
                  type="text"
                  name="resourceName"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  placeholder="Enter resource name"
                  required
                />
                <ErrorMessage name="resourceName" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="Matériel">Matériel</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Software">Software</option>
                  <option value="Logiciel">Logiciel</option>
                  <option value="Humain">Humain</option>
                  <option value="Autre">Autre</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Quantity</label>
                <Field
                  type="number"
                  name="quantity"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  placeholder="Enter quantity"
                  required
                />
                <ErrorMessage name="quantity" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Supplier</label>
                <Field
                  type="text"
                  name="supplier"
                  className="w-full p-2 sm:p-3 border border-blue-300 rounded-lg"
                  placeholder="Enter supplier name"
                  required
                />
                <ErrorMessage name="supplier" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Link to="/resource" className="order-2 sm:order-1">
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
                  {id ? "Update Resource" : "Save Resource"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResourceForm;