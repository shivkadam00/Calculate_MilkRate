import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [values, setValues] = useState({
    name: "",
    fats: "",
    snf: "",
    rate: "",
    location: "",
    phone: "",
  });

  const navigate = useNavigate();

  const calculateRate = () => {
    const fatValue = parseFloat(values.fats);
    const snfValue = parseFloat(values.snf);

    if (!isNaN(fatValue) && !isNaN(snfValue)) {
      const fatAdjustmentRate = 5; // Rate adjustment for each 0.1 change in FAT
      const snfAdjustmentRate = 1; // Rate adjustment for each 1 change in SNF

      const baseRate = 26;
      const initialFatValue = 3.5;
      const initialSnfValue = 8.5;

      let calculateFatValue = (fatValue - initialFatValue).toFixed(1);
      let calculateSnfValue = (snfValue - initialSnfValue).toFixed(2);

      let Fatdata = baseRate + calculateFatValue * fatAdjustmentRate;
      let Snfdata = (calculateSnfValue * snfAdjustmentRate) / 2;

      setValues((data) => {
        return {
          ...data,
          rate: Fatdata + Snfdata,
        };
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/users", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 border bg-white shadow p-5 rounded">
          <h1 className="mb-4">Add a User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fats" className="form-label">
                FAT:
              </label>
              <input
                type="text"
                name="fats"
                className="form-control"
                placeholder="Enter FAT"
                onChange={(e) => setValues({ ...values, fats: e.target.value })}
                onBlur={calculateRate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="snf" className="form-label">
                SNF:
              </label>
              <input
                type="text"
                name="snf"
                className="form-control"
                placeholder="Enter SNF"
                onChange={(e) => setValues({ ...values, snf: e.target.value })}
                onBlur={calculateRate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rate" className="form-label">
                Rate:
              </label>
              <input
                type="text"
                name="rate"
                className="form-control"
                placeholder="Rate of Milk"
                value={values.rate}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location:
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Enter location"
                onChange={(e) =>
                  setValues({ ...values, location: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter phone"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
