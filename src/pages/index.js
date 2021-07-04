import { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "../context/auth";

export default function Home() {
  const context = useContext(AuthContext);
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://mysterious-bastion-09867.herokuapp.com/api/user/login", {
        ...loginData,
      })
      .then((res) => {
        if (res.status === 200) {
          context.login(res.data);
          router.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/error");
      });
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            name="username"
            value={loginData.username}
            onChange={onChange}
            required
          />
          <label htmlFor="">Username</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="password"
            name="password"
            value={loginData.password}
            onChange={onChange}
            required
          />
          <label htmlFor="">password</label>
        </div>
        <div className="forget">
          <Link href="/login/forgot-password">
            <a>Forgot Password?</a>
          </Link>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
