import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { usePagination } from "../context/PaginationContext";

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentPage } = usePagination();

  const { id } = useParams();
  const handdleDelEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/employees/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Deleted Succefully", { variant: "success" });

        navigate(`/?page=${currentPage}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto bg-white">
        <h3>Are you sure you want to Delete this Employee</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handdleDelEmployee}
        >
          Yes Delete{" "}
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
