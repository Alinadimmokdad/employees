import React from "react";
import { motion } from "framer-motion";
import EmployeeSingleCard from "./EmployeeSingleCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const EmployeeCard = ({ employee }) => {
  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {employee.map((item) => (
        <EmployeeSingleCard key={item._id} employee={item} />
      ))}
    </motion.div>
  );
};

export default EmployeeCard;
