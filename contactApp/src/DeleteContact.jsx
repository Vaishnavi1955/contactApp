import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DeleteContact = ({ onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const contact = location.state?.contact;

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleDelete = () => {
    onDelete(id);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Delete Contact</h2>
      <p>Are you sure you want to delete <strong>{contact.name}</strong>?</p>
      <button className="ui button red" onClick={handleDelete}>Yes, Delete</button>
      <button className="ui button grey" onClick={handleCancel} style={{ marginLeft: '1rem' }}>Cancel</button>
    </div>
  );
};

export default DeleteContact;
