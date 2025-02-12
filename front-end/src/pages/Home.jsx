import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import EmployeeCard from "../components/home/EmployeeCard";
import { motion } from "framer-motion";
import { usePagination } from "../context/PaginationContext";

const Home = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage, setCurrentPage } = usePagination();
  const [employeesPerPage] = useState(8);

  // Fetch employees from the backend
  const fetchEmployees = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5555/employees", {
        params: { search },
      });
      setEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employee.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(employee.length / employeesPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Employee's List</h1>
          <Link to="/employees/create">
            <MdOutlineAddBox className="text-sky-800 text-5xl hover:scale-110 transition-transform duration-300 hover:text-sky-900" />
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-lg mb-6 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-colors duration-200"
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <>
            <EmployeeCard employee={currentEmployees} />
            {employee.length > employeesPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-sky-500 hover:text-white"
                    } transition-colors duration-200`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {employee.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full p-6 bg-red-50 border-2 border-red-200 text-red-800 text-center rounded-xl shadow-sm mt-6"
          >
            <h1 className="text-2xl font-semibold animate-pulse">
              No Employees Found 😕
            </h1>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
