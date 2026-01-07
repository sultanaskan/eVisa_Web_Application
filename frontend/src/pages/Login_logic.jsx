import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({});
  const { login, user } = useContext(AuthContext);

  const submit = () => {
    // For now, skip API call and just simulate login
    login({ name: form.email || "Demo User" });
  };

  return (
    <div>
      {user ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={() => login(null)}>Logout</button>
        </>
      ) : (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button onClick={submit}>Login</button>
        </>
      )}
    </div>
  );
}