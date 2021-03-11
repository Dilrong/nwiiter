import React, { useState } from "react";
import { authService } from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        if (newAccount) {
          await authService.createUserWithEmailAndPassword(email, password);
        } else {
          await authService.signInWithEmailAndPassword(email, password);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
        <input
          type="submit"
          placeholder="Log In"
          value={newAccount ? "Create Account" : "Login"}
        />
      </form>
      {error}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </div>
  );
};

export default Auth;
