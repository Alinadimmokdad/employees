import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDollarSign } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      type: "spring",
      damping: 10,
      stiffness: 80,
    },
  },
  hover: {
    scale: 1.05,
    y: -10,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const EmployeeSingleCard = ({ employee }) => {
  const imageUrl = employee.publisher
    ? `http://localhost:5555/${employee.publisher.replace("\\", "/")}`
    : null;

  return (
    <motion.div
      className="border-2 border-gray-300 rounded-2xl px-6 py-6 m-4 bg-white font-semibold text-lg shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {imageUrl && (
        <div className="my-4">
          <img
            src={imageUrl}
            alt="Employee"
            className="w-40 h-40 object-cover rounded-full shadow-xl mx-auto"
          />
        </div>
      )}
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1 text-gray-800">{employee.name}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <FiPhone className="text-red-300 text-2xl" />
        <h2 className="my-1 text-gray-700">{employee.phone}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <FaDollarSign className="text-red-300 text-2xl" />
        <h2 className="my-1 text-gray-700">{employee.salary}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <p className="text-red-300 text-xl">Start date</p>
        <h2 className="my-1 text-gray-600">{employee.startDate}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-4 mt-4 p-4">
        <Link to={`/employees/details/${employee._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/employees/edit/${employee._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/employees/delete/${employee._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EmployeeSingleCard;
