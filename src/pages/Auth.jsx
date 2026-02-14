import { MdAccountCircle } from "react-icons/md";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import style from "../styles/auth.module.css";
import { useAppContext } from "../context/AppContextProvider";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useAppContext();
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Аккаунт создан!");
      navigate("/auth/orders");
    } catch (error) {
      console.log("Ошибка регистрации");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(`Вход выполнен: ${userCredential.user.email}`);
    } catch (error) {
      console.log("Ошибка входа");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (user) {
    return <Navigate to="/auth/orders" replace />;
  }
  return (
    <div className={style.authBox}>
      <form className={style.authForm} onSubmit={handleLogIn}>
        <MdAccountCircle className={style.authIcon} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div className={style.buttonGroup}>
          <button type="submit">Log In</button>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
