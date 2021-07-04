import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/auth";
import Unauthorized from "../../components/unauthorized";

export default function Home() {
  const submit = useRef(null);
  const message = useRef(null);
  const router = useRouter();

  const context = useContext(AuthContext);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (submit.current && message.current) {
      if (registerData.password !== registerData.confirmPassword) {
        submit.current.disabled = true;
        message.current.innerText = "*Passwords do not match*";
      } else {
        submit.current.disabled = false;
        message.current.innerText = "";
      }
    }
  }, [registerData]);

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mysterious-bastion-09867.herokuapp.com/api/user/register",
        {
          username: registerData.username,
          phone: registerData.phone,
          password: registerData.password,
        }
      )
      .then((res) => {
        console.log(res);
        alert("new user created");
        router.push("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(context);

  return (
    <div>
      {context.user && context.user.user.role === "admin" ? (
        <div className="center">
          <h1>Register new user</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                autoComplete="off"
                type="text"
                name="username"
                value={registerData.username}
                onChange={onChange}
                required
              />
              <label htmlFor="">Username</label>
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={onChange}
                required
              />
              <label htmlFor="">Phone no.</label>
            </div>
            <div className="form-group">
              <input
                autoComplete="off"
                type="password"
                name="password"
                value={registerData.password}
                onChange={onChange}
                required
              />
              <label htmlFor="">password</label>
            </div>
            <div className="form-group">
              <input
                id="submit"
                autoComplete="off"
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={onChange}
                required
              />
              <label htmlFor="">confirm password</label>
            </div>
            <span ref={message}></span>
            <input
              type="submit"
              value="Create new user"
              disabled
              ref={submit}
            />
          </form>
        </div>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}
