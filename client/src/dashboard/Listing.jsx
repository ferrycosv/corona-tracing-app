import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ListItem from "./ListItem";

export default function ListingComponent(props) {
  const [edit, setEdit] = useState(-1);
  const handleDelete = (index, e) => {
    if (props.checkContactFormToggle()) return;
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
    if (props.checkContactFormToggle()) return;
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

  return (
    <>
      {props.contacts.map((item, idx) => {
        item.contactDate = item.contactDate.split("T")[0];
        return (
          <>
            {edit === idx && (
              <ContactForm
                edit={item}
                new={false}
                onContactSave={props.onContactSave}
                idx={idx}
                setEdit={setEdit}
                key={idx}
              />
            )}
            {edit !== idx && (
              <ListItem
                item={item}
                idx={idx}
                filter={props.checkFilterActive}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                key={idx}
              />
            )}
          </>
        );
      })}
    </>
  );
}
