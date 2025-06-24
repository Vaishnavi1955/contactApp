import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 as uuid } from 'uuid';
import Header from './Header';
import api from "./api/contacts"; // Axios instance
import AddContact1 from './AddContact';
import ContactList1 from './ContactList';
import ContactCard2 from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import EditContact1 from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [Contact, setContact] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch all contacts
  const retrieveContacts1 = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  // Add contact
  const addContacthandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContact([...Contact, response.data]);
  };

  // Delete contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = Contact.filter((contact) => contact.id !== id);
    setContact(newContactList);
  };

  // Update contact
  const updateContactHandler = async (updatedContact) => {
    await api.put(`/contacts/${updatedContact.id}`, updatedContact);
    const updatedList = Contact.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContact(updatedList);
  };

  // Load contacts from API
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts1();
      if (allContacts) setContact(allContacts);
      setIsLoaded(true); // ✅ Mark loaded for future use
    };
    getAllContacts();
  }, []);

  // Store to localStorage (optional backup)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Contact));
    }
  }, [Contact, isLoaded]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact1 addContacthandler={addContacthandler} />}
          />
          <Route
            path="/"
            element={<ContactList1 contacts={Contact} getContactId={removeContactHandler} />}
          />
          <Route
            path="/contact/:id"
            element={<ContactCard2 />}
          />
          <Route
            path="/delete/:id"
            element={<DeleteContact onDelete={removeContactHandler} />}
          />
          <Route
            path="/edit/:id"
            element={<EditContact1 updateContactHandler={updateContactHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
