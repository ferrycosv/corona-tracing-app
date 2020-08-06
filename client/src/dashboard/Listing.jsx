import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "antd";
import ContactForm from "./ContactForm";

const tableColumn = {
  width: "100px",
};

export default function ListingComponent(props) {
  const [edit, setEdit] = useState(-1);
  const handleDelete = (id, e) => {
    if (edit !== -1) {
      if (
        window.confirm(
          "You are currently editing, Do you want to discard changes?"
        )
      ) {
        setEdit(-1);
        return;
      }
    }
    if (window.confirm("Are you sure you want to delete the record?")) {
      props.handleDelete(id);
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
        return;
      }
    }
    setEdit(index);
  };
  const ListItem = (props) => {
    return (
      <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4">
        <div style={tableColumn}>{props.item.fullName}</div>
        <div style={tableColumn}>{props.item.contactDate}</div>
        <div style={tableColumn}>{props.item.contactPlace}</div>
        <div style={tableColumn}>{props.item.status}</div>
        <div style={tableColumn}>
          <span
            onClick={(e) => handleDelete(props.idx)}
            style={{
              color: "red",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </span>
          <span
            onClick={(e) => handleEdit(props.idx)}
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
      {props.contacts.map((x, idx) => {
        return (
          <div
            key={idx}
            className="d-flex flex-row w-100 justify-content-between align-items-center mt-4"
            style={{ color: "#DFDFDF", height: "24px" }}
          >
            {(edit === idx && <ContactForm edit={x} />) || (
              <ListItem item={x} idx={idx} />
            )}
          </div>
        );
      })}
    </>
  );
}
