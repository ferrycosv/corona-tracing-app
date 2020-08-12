import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ListItem(props) {
  return (
    <>
      <tr>
        <td data-label="Name">{props.item.fullName}</td>
        <td data-label="Date">{props.item.contactDate}</td>
        <td data-label="Location">{props.item.contactPlace}</td>
        <td data-label="Status">{props.item.status}</td>
        <td data-label="">
          {!props.filter() && (
            <>
              <span
                onClick={(e) => props.handleDelete(props.idx)}
                style={{
                  color: "red",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faTrash} size="1x" />
              </span>
              <span
                onClick={(e) => props.handleEdit(props.idx)}
                style={{
                  color: "white",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faEdit} size="1x" />
              </span>
            </>
          )}
        </td>
      </tr>
    </>
  );
}
