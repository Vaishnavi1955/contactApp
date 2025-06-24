import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditContact.css"; // 💡 External CSS for styling

function EditContact1({ updateContactHandler }) {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact;

  if (!contact) {
    return <div className="ui message red">No contact data found.</div>;
  }

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);

  const update = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("All fields are mandatory");
      return;
    }
    updateContactHandler({ id: contact.id, name, email });
    navigate("/");
  };

  return (
    <div className="edit-contact-container">
      <div className="edit-contact-card">
        <h2>Edit Contact</h2>
        <form onSubmit={update}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Update Contact</button>
        </form>
      </div>
    </div>
  );
}

export default EditContact1;
