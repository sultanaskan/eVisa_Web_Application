// src/Page.jsx
import React, { useState } from "react";

const Page = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ name: "Demo User" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <h1>Visa Processing Website</h1>

      {user ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default Page;