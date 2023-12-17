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

  const [calculatedRate, setCalculatedRate] = useState(null);

  const navigate = useNavigate();

  // const calculateRate = () => {
  //   const fatValue = parseFloat(values.fats);
  //   const snfValue = parseFloat(values.snf);

  //   if (!isNaN(fatValue) && !isNaN(snfValue)) {
  //     const baseRate = 26;
  //     const fatAdjustment = Math.floor((fatValue - 3.5) / 0.1) * 0.50; // Decrease by 0.50 for each 0.1 decrease
  //     const snfAdjustment = Math.floor((snfValue - 8.5) / 1) * 0.50; // Decrease by 0.50 for each 1 decrease

  //     const calculatedRate = baseRate - fatAdjustment - snfAdjustment;

  //     setCalculatedRate(calculatedRate.toFixed(2));
  //     setValues({ ...values, rate: calculatedRate.toFixed(2) });
  //   }
  // };

  const calculateRate = () => {
    const fatValue = parseFloat(values.fats);
    const snfValue = parseFloat(values.snf);

    if (!isNaN(fatValue) && !isNaN(snfValue)) {
  
      const fatAdjustmentRate = 5; // Rate adjustment for each 0.1 change in FAT
      const snfAdjustmentRate = 1; // Rate adjustment for each 1 change in SNF

      // Calculate rate based on initial values (3.5, 8.5)
      const baseRate = 26;
      const initialFatValue = 3.5;
      const initialSnfValue = 8.5;

      let calculateFatValue = (fatValue - initialFatValue).toFixed(1);
      let calculateSnfValue = (snfValue - initialSnfValue).toFixed(2);

      let Fatdata = baseRate + calculateFatValue * fatAdjustmentRate;
      let Snfdata = (calculateSnfValue * snfAdjustmentRate) / 2;
      console.log("newvalue", Fatdata + Snfdata);

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
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">FAT :</label>
            <input
              type="text"
              name="fats"
              className="form-control"
              placeholder="Enter FAT"
              onChange={(e) => setValues({ ...values, fats: e.target.value })}
              onBlur={calculateRate}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">SNF :</label>
            <input
              type="text"
              name="snf"
              className="form-control"
              placeholder="Enter SNF"
              onChange={(e) => setValues({ ...values, snf: e.target.value })}
              onBlur={calculateRate}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">Rate :</label>
            <input
              type="text"
              name="rate"
              className="form-control"
              placeholder="Rate of Milk"
              value={values.rate}
              readOnly
            />
          </div>
          <div className="mb-2">
            <label htmlFor="location">Location :</label>
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
          <div className="mb-2">
            <label htmlFor="phone">Phone :</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
