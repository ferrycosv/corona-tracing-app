import React, { useEffect, useState } from "react";
import { getDate, getMonth, getYear } from "date-fns";

const inputStyle = {
  background: "#FFFFFF",
  border: "1px solid #CCCCCC",
  borderRadius: "5px",
  width: "100%",
};
const buttonStyle = {
  background: "#659B5E",
  border: "1px solid #5248C6",
  borderRadius: "5px",
  color: "#ffffff",
  width: "100%",
};
export default function ContactForm(props) {
  const [contactForm, setContactForm] = useState({
    fullName: "",
    contactDate: `${getYear(new Date())}-${(getMonth(new Date()) + 1)
      .toString()
      .padStart(2, "0")}-${getDate(new Date()).toString().padStart(2, "0")}`,
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
    const form = document.getElementById("contact_form");
    if (form.reportValidity()) {
      if (!props.new) props.setEdit(-1);
      props.onContactSave(contactForm, props.new, props.idx);
    }
  };

  return (
    <>
      <tr>
        <td data-label="Name">
          <input
            style={inputStyle}
            id="fullName"
            type="text"
            name="fullName"
            onChange={handleInputChange}
            required
            value={contactForm.fullName}
            form="contact_form"
          />
        </td>
        <td data-label="Date" className="justify-content-center">
          <input
            style={inputStyle}
            id="contactDate"
            type="date"
            name="contactDate"
            onChange={handleInputChange}
            required
            value={contactForm.contactDate}
            max={`${getYear(new Date())}-${(getMonth(new Date()) + 1)
              .toString()
              .padStart(2, "0")}-${getDate(new Date())
              .toString()
              .padStart(2, "0")}`}
            form="contact_form"
          />
        </td>
        <td data-label="Location">
          <input
            style={inputStyle}
            id="contactPlace"
            type="text"
            name="contactPlace"
            onChange={handleInputChange}
            required
            value={contactForm.contactPlace}
            form="contact_form"
          />
        </td>
        <td data-label="Status">
          <select
            name="status"
            value={contactForm.status}
            onChange={handleInputChange}
            form="contact_form"
          >
            <option value="not infected">Not infected</option>
            <option value="infected">Infected</option>
          </select>
        </td>
        <td data-label="">
          <button
            style={buttonStyle}
            form="contact_form"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </td>
      </tr>
    </>
  );
}
