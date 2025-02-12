import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaDollarSign } from "react-icons/fa";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const todayDateObj = new Date();
  const [startDate, setStartDate] = useState(
    `${todayDateObj.getFullYear()}-${(todayDateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${todayDateObj.getDate().toString().padStart(2, "0")}`
  );
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [publisherImage, setPublisherImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cvAttachment, setCvAttachment] = useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlePublisherImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPublisherImage(file);
      setErrors((prev) => ({ ...prev, publisherImage: "" }));
    }
  };

  const handleCvAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvAttachment(file);
      setErrors((prev) => ({ ...prev, cvAttachment: "" }));
    }
  };

  const handleChooseFileClick = () => {
    document.getElementById("fileInput").click();
  };

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    else if (/\d/.test(name))
      newErrors.name = "Name should not contain numbers";

    if (!phone) newErrors.phone = "Phone is required";
    if (!salary) newErrors.salary = "Salary is required";
    if (!startDate) newErrors.startDate = "Start date is required";

    if (!publisherImage)
      newErrors.publisherImage = "Employee image is required";

    if (!cvAttachment) newErrors.cvAttachment = "CV attachment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEmployee = () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("salary", salary);
    formData.append("startDate", startDate);
    if (publisherImage) {
      formData.append("publisherImage", publisherImage);
    }
    if (cvAttachment) {
      formData.append("cvAttachment", cvAttachment); // Add this line
    }

    setLoading(true);

    axios
      .post("http://localhost:5555/employees", formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Employee Created Successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error Creating Employee", { variant: "error" });
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-gray-900 my-6">
          Create Employee
        </h1>
        {loading && <Spinner />}
        <div className="flex flex-col border-2 border-sky-200 rounded-xl p-8 bg-white shadow-lg">
          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter employee name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Phone
            </label>
            <PhoneInput
              international
              value={phone}
              onChange={(value) => {
                setPhone(value);
                setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Salary (USD)
            </label>
            <div className="flex items-center">
              <FaDollarSign className="text-xl text-gray-500 mr-2" />
              <input
                type="number"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                  setErrors((prev) => ({ ...prev, salary: "" }));
                }}
                placeholder="Enter salary in USD"
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setErrors((prev) => ({ ...prev, startDate: "" }));
              }}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Employee Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePublisherImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleChooseFileClick}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
            >
              Choose File
            </button>
            {errors.publisherImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publisherImage}
              </p>
            )}
            {publisherImage && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(publisherImage)}
                  alt="Employee Preview"
                  className="w-24 h-24 object-cover rounded-full shadow-md"
                />
              </div>
            )}
          </div>
          <div className="my-4">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              CV Attachment
            </label>
            <input
              id="cvInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvAttachmentChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById("cvInput").click()}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
            >
              Choose CV File
            </button>
            {errors.cvAttachment && (
              <p className="text-red-500 text-sm mt-1">{errors.cvAttachment}</p>
            )}
            {cvAttachment && (
              <div className="mt-4">
                <p className="text-gray-700">
                  Selected File: {cvAttachment.name}
                </p>
              </div>
            )}
          </div>

          <button
            className="px-6 py-3 bg-sky-500 text-white text-xl font-semibold rounded-lg mt-8 hover:bg-sky-600 transition-colors duration-200"
            onClick={handleSaveEmployee}
          >
            Save Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
