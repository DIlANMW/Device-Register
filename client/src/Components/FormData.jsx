import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "../Styles/FormData.css";

function FormData() {
  const [showNewCategoryField, setShowNewCategoryField] = useState(false);
  const [disableCategorySelect, setDisableCategorySelect] = useState(false);
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    DeviceName: "",
    Description: "",
    PowerRating: "",
    Category: "",
  });
  const [categories, setCategories] = useState([]);
  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [navigate, redirected]);

  const fetchData = () => {
    fetch("http://localhost:3000/devices")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);

        const existingCategories = Array.from(
          new Set(data.map((item) => item.Category))
        );

        setCategories(existingCategories);

        const foundItem = data.find(
          (item) => window.location.pathname === `/modify/${item.DeviceID}`
        );

        if (foundItem) {
          setDataToInsert((prevState) => ({
            ...prevState,
            ...foundItem,
          }));
        } else {
          if (!redirected) {
            setRedirected(true);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = foundItem
      ? `http://localhost:3000/devices/${dataToInsert.DeviceID}`
      : "http://localhost:3000/devices";

    const method = foundItem ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }

    if (!foundItem) {
      setShowNewCategoryField(false);
      setDisableCategorySelect(false);
    }
  };

  const handleChange = (e) => {
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCategory = () => {
    setShowNewCategoryField(true);
    setDisableCategorySelect(true);
  };

  const foundItem = result.find(
    (item) => window.location.pathname === `/modify/${item.DeviceID}`
  );

  return (
    <div className="form_div">
      <h1>
        <title>
          {foundItem ? "Update Information" : "Device Registration"}
        </title>
      </h1>
      <h1 className="form-text">
        {foundItem ? "Update Infomation" : "Device Registration"}
      </h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="form_input"
          type="text"
          value={dataToInsert.DeviceName}
          name="DeviceName"
          onChange={handleChange}
          placeholder="Device Name"
          required
          autoComplete="none"
        />
        <textarea
          className="form_input textarea"
          rows={foundItem ? 5 : ""}
          value={dataToInsert.Description}
          name="Description"
          onChange={handleChange}
          placeholder="Description.."
          required
          autoComplete="none"
        ></textarea>
        <input
          className="form_input"
          type="number"
          value={dataToInsert.PowerRating}
          name="PowerRating"
          onChange={handleChange}
          placeholder="Power Rating"
          required
          autoComplete="none"
        />
        <button
          type="button"
          className="create-button btn"
          onClick={handleCreateCategory}
        >
          <FaPlus style={{ fontSize: "14px", marginRight: "5px" }} />
          New Category
        </button>
        <p className="infor">
          Here you can create a category and use it afterward or select an
          existing one
        </p>
        {showNewCategoryField && (
          <input
            className="form_input"
            type="text"
            value={dataToInsert.Category}
            name="Category"
            onChange={handleChange}
            placeholder="Create a new category"
            autoComplete="none"
          />
        )}
        {!disableCategorySelect ? (
          <select
            className="form_input"
            value={dataToInsert.Category}
            name="Category"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : null}
        <button className="form_button">Save</button>
      </form>
    </div>
  );
}

export default FormData;
