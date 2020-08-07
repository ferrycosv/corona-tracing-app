import React, { useEffect, useState } from "react";

const tableColumn = {
  width: "100px",
};
const inputStyle = {
  background: "#FFFFFF",
  border: "1px solid #CCCCCC",
  borderRadius: "15px",
};
const buttonStyle = {
  background: "#4C64E3",
  border: "1px solid #5248C6",
  borderRadius: "15px",
  padding: "2px 10px ",
};
export default function ContactForm(props) {
  const [contactForm, setContactForm] = useState({
    fullName: "",
    contactDate: "",
    contactPlace: "",
    status: "not infected",
  });
  useEffect(() => {
    if (props.edit) setContactForm({ ...contactForm, ...props.edit });
  }, []);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleSaveClick = (event) => {
    if(!props.new) props.setEdit(-1);
    props.onContactSave(contactForm, props.new, props.idx);
  };

  return (
    <div
      className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4"
      style={{ color: "#DFDFDF", height: "24px" }}
    >
      <div style={tableColumn}>
        <input
          style={inputStyle}
          id="fullName"
          type="text"
          name="fullName"
          onChange={handleInputChange}
          required
          value={contactForm.fullName}
        />
      </div>
      <div style={tableColumn}>
        <input
          style={inputStyle}
          id="contactDate"
          type="date"
          name="contactDate"
          onChange={handleInputChange}
          required
          value={contactForm.contactDate}
        />
      </div>
      <div style={tableColumn}>
        <input
          style={inputStyle}
          id="contactPlace"
          type="text"
          name="contactPlace"
          onChange={handleInputChange}
          required
          value={contactForm.contactPlace}
        />
      </div>
      <div style={tableColumn}>
        <select
          name="status"
          value={contactForm.status}
          onChange={handleInputChange}
        >
          <option value="not infected">Not infected</option>
          <option value="infected">Infected</option>
        </select>
      </div>
      <div style={tableColumn}>
        <button style={buttonStyle} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}
