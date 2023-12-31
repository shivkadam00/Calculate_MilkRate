import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 border bg-white shadow p-5 rounded">
          <h3>Details of Farmer</h3>
          <div className="mb-2">
            <strong>Name: {data.name}</strong>
          </div>
          <div className="mb-2">
            <strong>FAT: {data.fats}</strong>
          </div>
          <div className="mb-2">
            <strong>SNF: {data.snf}</strong>
          </div>
          <div className="mb-2">
            <strong>Rate Of Milk: {data.rate}</strong>
          </div>
          <Link to={`/update/${id}`} className="btn btn-success">
            Edit
          </Link>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
