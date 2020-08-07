import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";

const tableColumn = {
  width: "100px",
};

export default function ListingComponent(props) {
  const [edit, setEdit] = useState(-1);
  const handleDelete = (index, e) => {
    if (edit !== -1) {
      if (
        window.confirm(
          "You are currently editing, Do you want to discard changes?"
        )
      ) {
        setEdit(-1);
        props.handleEditing(false);
        return;
      }
    }
    if (window.confirm("Are you sure you want to delete the record?")) {
      props.handleDelete(index);
    }
  };

  const handleEdit = (index, e) => {
    if (edit !== -1) {
      if (
        window.confirm(
          "You are currently editing, Do you want to discard changes?"
        )
      ) {
        setEdit(-1);
        props.handleEditing(false);
        return;
      }
    }
    setEdit(index);
    props.handleEditing(true);
  };
  const ListItem = (props_) => {
    return (
      <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4">
        <div style={tableColumn}>{props_.item.fullName}</div>
        <div style={tableColumn}>{props_.item.contactDate}</div>
        <div style={tableColumn}>{props_.item.contactPlace}</div>
        <div style={tableColumn}>{props_.item.status}</div>
        <div style={tableColumn}>
          <span
            onClick={(e) => handleDelete(props_.idx)}
            style={{
              color: "red",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </span>
          <span
            onClick={(e) => handleEdit(props_.idx)}
            style={{
              color: "white",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {props.contacts.map((item, idx) => {
        item.contactDate = item.contactDate.split("T")[0];
        return (
          <div
            key={idx}
            className="d-flex flex-row w-100 justify-content-between align-items-center mt-4"
            style={{ color: "#DFDFDF", height: "24px" }}
          >
            {(edit === idx && (
              <ContactForm
                edit={item}
                new={false}
                onContactSave={props.onContactSave}
                idx={idx}
                setEdit={setEdit}
              />
            )) || <ListItem item={item} idx={idx} />}
          </div>
        );
      })}
    </>
  );
}
