import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api/contacts";
import user from "./assets/user.png"; // assuming you have a user.png in /src/images

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await api.get(`/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        console.log("Contact not found", error);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) return <div>Contact not found</div>;

  const { name, email } = contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <h3>Contact Details!!</h3>
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div" style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/">
          <button className="ui button blue center">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
