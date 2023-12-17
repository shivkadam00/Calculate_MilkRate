import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get("http://localhost:8000/users");
        setData(responce.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) { 
        try {
          await axios.delete(`http://localhost:8000/users/${id}`);
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
          console.log(error);
        }
      
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Farmer</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Payment Method</th> */}
              <th>Location</th>
              <th>Phone</th>
              <th>FAT</th>
              <th>SNF</th>
              <th>Rate Of Milk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td>{d.phone}</td>
                <td>{d.fats}</td>
                <td>{d.snf}</td>
                <td>{d.rate}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
