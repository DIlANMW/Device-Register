import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import "../Styles/DeviceList.css";

function ListOfResult() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/devices")
      .then((res) => res.json())
      .then((data) => {
        setResult(data.reverse());
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = async (deviceId) => {
    if (window.confirm("Are you sure you want to delete this information?")) {
      try {
        await fetch(`http://localhost:3000/devices/${deviceId}`, {
          method: "DELETE",
        });

        fetchData();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Deletion request canceled.");
    }
  };

  return (
    <div className="results">
      <h1 className="title_results">Added devices</h1>
      <section className="section_all_results">
        {result.map((item) => (
          <section key={item.DeviceID} className="section_individual_result">
            <article>
              <p className="device-name">{item.DeviceName}</p>
              <p className="device-desc">{item.Description}</p>
              <p className="rating">Power Rating: {item.PowerRating}</p>
              <p className="category">Category: {item.Category}</p>
              <p className="product_result"></p>
            </article>
            <div className="div_buttons_results">
              <Link to={`/modify/${item.DeviceID}`}>
                <button className="modify_results">
                  {" "}
                  <BsPencilSquare
                    style={{ fontSize: "13px", marginRight: "5px" }}
                  />{" "}
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.DeviceID)}
                className="delete_results"
              >
                <FaTrash style={{ fontSize: "13px", marginRight: "5px" }} />
                Delete
              </button>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

export default ListOfResult;
