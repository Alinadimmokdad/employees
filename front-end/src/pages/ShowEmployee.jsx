import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const imageUrl = employee.publisher
    ? `http://localhost:5555/${employee.publisher.replace("\\", "/")}`
    : null;

  const cvUrl = employee.cvAttachment
    ? `http://localhost:5555/${employee.cvAttachment.replace("\\", "/")}`
    : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-gray-900 my-6">
          Details of {employee.name}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col bg-white p-6 border-2 border-sky-800 rounded-xl shadow-sm">
            <div className="my-4">
              <span className="text-xl font-semibold text-gray-500">Id:</span>
              <span>{employee._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold text-gray-500">Name:</span>
              <span>{employee.name}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold text-gray-500">
                Phone:
              </span>
              <span>{employee.phone}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold text-gray-500">
                Salary in USD:
              </span>
              <span>{employee.salary}</span>
            </div>
            <div className="my-4">
              <span className="text-xl font-semibold text-gray-500">
                Start Date:
              </span>
              <span>{employee.startDate}</span>
            </div>

            {imageUrl && (
              <div className="my-4">
                <img
                  src={imageUrl}
                  alt="Publisher"
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {cvUrl && (
              <div className="my-4">
                <span className="text-xl font-semibold text-gray-500">
                  Resume:
                </span>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200 mt-2"
                >
                  Open CV
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEmployee;
