import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaDollarSign } from "react-icons/fa";
import { usePagination } from "../context/PaginationContext";
import PhoneInput from "react-phone-number-input"; // Import PhoneInput
import "react-phone-number-input/style.css"; // Import styles

const EditEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publisherImage, setPublisherImage] = useState(null);
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentPage } = usePagination();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [cvAttachment, setCvAttachment] = useState(null);

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
    if (!startDate) newErrors.startDate = "Start Date is required";
    if (!salary) newErrors.salary = "Salary is required";
    if (!publisherImage && !publisher)
      newErrors.publisherImage = "Employee image is required";

    if (!cvAttachment && !publisher)
      newErrors.cvAttachment = "CV attachment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEmployee = () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("startDate", startDate);
    formData.append("salary", salary);
    if (publisherImage) {
      formData.append("publisherImage", publisherImage);
    } else {
      formData.append("publisher", publisher);
    }
    if (cvAttachment) {
      formData.append("cvAttachment", cvAttachment);
    }

    setLoading(true);

    axios
      .put(`http://localhost:5555/employees/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Employee Updated Successfully", {
          variant: "success",
        });
        navigate(`/?page=${currentPage}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error Updating Employee", { variant: "error" });
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        // Ensure the phone number is in E.164 format
        const phoneNumber = response.data.phone.startsWith("+")
          ? response.data.phone
          : `+${response.data.phone}`; // Add a '+' if missing
        setPhone(phoneNumber);
        setStartDate(response.data.startDate);
        setName(response.data.name);
        setPublisher(response.data.publisher);
        setSalary(response.data.salary);
        setCvAttachment(response.data.cvAttachment);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-gray-900 my-6">Edit Employee</h1>
        {loading ? <Spinner /> : ""}
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
            {/* PhoneInput with international formatting */}
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
            {(publisher || publisherImage) && (
              <div className="mt-4">
                <img
                  src={
                    publisherImage
                      ? URL.createObjectURL(publisherImage)
                      : `http://localhost:5555/${publisher}`
                  }
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
                {typeof cvAttachment === "string" ? (
                  <a
                    href={`http://localhost:5555/${cvAttachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Existing CV
                  </a>
                ) : (
                  <p className="text-gray-700">
                    Selected File: {cvAttachment.name}
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            className="px-6 py-3 bg-sky-500 text-white text-xl font-semibold rounded-lg mt-8 hover:bg-sky-600 transition-colors duration-200"
            onClick={handleSaveEmployee}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
