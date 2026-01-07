import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);

  const submit = async () => {
    const res = await api.post("/auth/register", form);
    login(res.data);
  };

  return (
    <>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={submit}>Register</button>
    </>
  );
}
