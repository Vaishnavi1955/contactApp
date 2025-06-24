import React from "react";
import user from "./assets/user.png";
import { Link, useNavigate } from "react-router-dom";

const ContactCard1 = (props) => {
  const { id, name, email } = props.contact;
  const navigate = useNavigate();

  const confirmDelete = () => {
    navigate(`/delete/${id}`, { state: { contact: props.contact } });
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`, { state: { contact: props.contact } });
  };

  return (
    <div className="item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content" style={{ marginLeft: "1rem" }}>
          <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
            <div className="header">{name}</div>
            <div>{email}</div>
          </Link>
        </div>
      </div>

      <div>
        <i
          className="trash alternate icon"
          style={{ color: "red", marginRight: "10px", cursor: "pointer" }}
          onClick={confirmDelete}
        ></i>
        <i
          className="edit alternate icon"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={handleEdit}
        ></i>
      </div>
    </div>
  );
};

export default ContactCard1;
