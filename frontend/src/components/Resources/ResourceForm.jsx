import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResourceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    resourceName: "",
    type: "",
    quantity: "",
    supplier: "",
  };

  const validationSchema = Yup.object().shape({
    resourceName: Yup.string().required("Resource Name is required"),
    type: Yup.string().required("Type is required"),
    quantity: Yup.number().required("Quantity is required").positive("Quantity must be a positive number").integer("Quantity must be an integer"),
    supplier: Yup.string().required("Supplier is required"),
  });

  const [resource, setResource] = useState(initialValues);

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:3000/api/resources/${id}`)
        .then((response) => {
          setResource(response.data);
        })
        .catch((error) => console.error("Error fetching resource:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:3000/api/resources/${id}`, values);
        toast.success("Resource updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:3000/api/resources", values);
        toast.success("Resource created successfully!");
      }
      navigate("/resource");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <div className="flex-grow p-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">{id ? "Edit Resource" : "Add New Resource"}</h2>

        <Formik
          initialValues={resource}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4 bg-white p-8 rounded-lg border border-blue-500 shadow-md">
              <div>
                <label className="block font-medium">Resource Name</label>
                <Field
                  type="text"
                  name="resourceName"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="resourceName" component="div" className="text-red-600" />
              </div>

              <div>
                <label className="block font-medium">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="w-full p-3 border border-blue-300 rounded-lg"
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
                <ErrorMessage name="type" component="div" className="text-red-600" />
              </div>

              <div>
                <label className="block font-medium">Quantity</label>
                <Field
                  type="number"
                  name="quantity"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  min="1"
                  required
                />
                <ErrorMessage name="quantity" component="div" className="text-red-600" />
              </div>

              <div>
                <label className="block font-medium">Supplier</label>
                <Field
                  type="text"
                  name="supplier"
                  className="w-full p-3 border border-blue-300 rounded-lg"
                  required
                />
                <ErrorMessage name="supplier" component="div" className="text-red-600" />
              </div>

              <div className="flex justify-between">
                <Link to="/resource">
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