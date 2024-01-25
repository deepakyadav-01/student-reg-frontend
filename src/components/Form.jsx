import React, { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

//initializing the form data
const Form = ({ onFormSubmit, selectedStudent }) => {
  const initialFormData = {
    fullName: "",
    dob: "",
    age: "",
    email: "",
    mobileno: "",
    gender: "",
    address: "",
  };

  //setting form data
  const [formData, setFormData] = useState(selectedStudent || initialFormData);
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    dob: "",
    age: "",
    email: "",
    mobileno: "",
    gender: "",
    address: "",
  });

  //   validation of form
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilenoRegex = /^[6-9][0-9]{9}$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    if (!value || !value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} is required`,
      }));
      return false;
    } else if (fieldName === "email" && !emailRegex.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return false;
    } else if (fieldName === "mobileno" && !mobilenoRegex.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        mobileno: "Invalid phone number format",
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      return true;
    }
  };

  //   handle for submit of form
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      onFormSubmit(e, formData);
      setFormData(initialFormData);
    }
  };

  //   handle for reset button
  const handleReset = () => {
    setFormData(initialFormData);
    toast.success("Form Resseted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  //   validation
  const validateForm = () => {
    let isFormValid = true;

    Object.keys(formData).forEach((fieldName) => {
      const fieldValue = formData[fieldName];
      const isValid = validateField(fieldName, fieldValue);

      if (!isValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  };

  return (
    <div className="card" id="cardform">
      <div className="p-2 ">
        <header>Student Registration</header>
        {/* form start */}
        <form
          autoComplete="off"
          className="form-group"
          id="studentForm"
          onSubmit={handleSubmit}
        >
          {/* field container */}
          <div className="fields">
            {/* for Name */}
            <div className="input_field">
              <label htmlFor="fullName">
                Full Name<span className="ast">*</span>
                <span className="error-message">{formErrors.fullName}</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="form-control"
                onChange={handleInputChange}
                value={formData.fullName || ""}
              />
            </div>
            {/* for DOB */}
            <div className="input_field">
              <label htmlFor="dob">
                DOB<span className="ast">*</span>
                <span className="error-message">{formErrors.fullName}</span>
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="form-control"
                onChange={handleInputChange}
                value={formData.dob || ""}
              />
            </div>
            {/* for Age */}
            <div className="input_field">
              <label htmlFor="age">
                Age<span className="ast">*</span>
                <span className="error-message">{formErrors.age}</span>
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className="form-control"
                onChange={handleInputChange}
                value={formData.age || ""}
              />
            </div>
            {/* for Email */}
            <div className="input_field">
              <label htmlFor="email">
                E-mail<span className="ast">*</span>{" "}
                <span className="error-message">{formErrors.email}</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleInputChange}
                value={formData.email || ""}
              />
            </div>
            {/* for Mobile Number */}
            <div className="input_field">
              <label htmlFor="mobileno">
                Mobile No.<span className="ast">*</span>{" "}
                <span className="error-message">{formErrors.mobileno}</span>
              </label>
              <input
                type="number"
                name="mobileno"
                id="mobileno"
                className="form-control"
                onChange={handleInputChange}
                value={formData.mobileno || ""}
              />
            </div>
            {/* for Gender */}
            <div className="gender">
              <label htmlFor="gender">
                Gender:<span className="ast">*</span>{" "}
                <span className="error-message">{formErrors.gender}</span>
              </label>
              <div className="flex">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="form-control"
                  onChange={handleInputChange}
                  checked={formData.gender === "female" || ""}
                />
                <label htmlFor="female" className="text-sm mr-4">
                  Female
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  className="form-control"
                  onChange={handleInputChange}
                  checked={formData.gender === "male" || ""}
                />
                <label htmlFor="male" className="text-sm mr-4">
                  Male
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="others"
                  value="others"
                  className="form-control"
                  onChange={handleInputChange}
                  checked={formData.gender === "others" || ""}
                />
                <label htmlFor="others" className="text-sm">
                  Others
                </label>
              </div>
            </div>
            {/* for address field */}
            <div className="input_field">
              <label htmlFor="address">
                Address<span className="ast">*</span>
                <span className="error-message">{formErrors.address}</span>
              </label>
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="3"
                className="form-control"
                onChange={handleInputChange}
                value={formData.address || ""}
              ></textarea>
            </div>
          </div>
          {/* submit and reset buttons */}
          <div className="form_action--button">
            <input
              type="submit"
              id="submit"
              value="Submit"
              className="btn btn-success"
            />
            <input
              type="reset"
              id="reset"
              value="Reset"
              className="btn btn-warning"
              onClick={handleReset}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
