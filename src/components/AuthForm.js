import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
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
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          className="authInput"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={password}
          className="authInput"
          required
        />
        <input
          type="submit"
          className="authInput authSubmit"
          placeholder="Log In"
          value={newAccount ? "Create Account" : "Login"}
        />
      </form>
      {error && <span className="authError">{error}</span>}
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
