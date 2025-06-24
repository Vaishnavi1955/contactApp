import React, { useState } from "react";
import ContactCard1 from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList1 = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🎤 Voice search logic
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
    };
  };

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const filteredContacts = props.contacts.filter((contact) =>
    (contact.name + contact.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContactList = filteredContacts.map((contact) => (
    <ContactCard1
      key={contact.id}
      contact={contact}
      clickHandler={deleteContactHandler}
    />
  ));

  return (
    <div className="main" style={{ padding: "30px 20px", minHeight: "100vh", background: "#fff" }}>
<div
  className="ui segment"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "100px 0 10px",
    padding: "20px",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  }}
>
  <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "bold", color: "#333" }}>
    📒 Contact List
  </h2>
  <Link to="/add">
    <button className="ui button blue">Add Contact</button>
  </Link>
</div>



      {/* 🔍 Search + 🎤 Voice */}
      <div className="ui action input" style={{ width: "100%", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ui icon orange button"
          title="Voice Search"
          onClick={handleVoiceSearch}
        >
          🎤
        </button>
      </div>

      {/* Render Contacts */}
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList1;
