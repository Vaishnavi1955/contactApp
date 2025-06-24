import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

function AddContact1(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // ✅ Step 2

    const add = (e) => {
        e.preventDefault();
        if (!name || !email) {
            alert("All fields are mandatory");
            return;
        }
        props.addContacthandler({ name, email });
        setName("");
        setEmail("");
        navigate("/"); // ✅ Step 3
    };

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="ui button blue" type="submit">Save</button>
            </form>
        </div>
    );
}

export default AddContact1;
