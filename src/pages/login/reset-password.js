import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const submit = useRef(null);
  const message = useRef(null);

  const router = useRouter();

  const context = useContext(AuthContext);

  const [registerData, setRegisterData] = useState({
    id: context.user ? context.user._id : "",
    username: context.user ? context.user.username : "",
    password: "",
    phone: context.user ? context.user.phone : "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (registerData.password !== registerData.confirmPassword) {
      submit.current.disabled = true;
      message.current.innerText = "*Passwords do not match*";
    } else {
      submit.current.disabled = false;
      message.current.innerText = "";
    }
  }, [registerData]);

  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://mysterious-bastion-09867.herokuapp.com/api/user/update-data",
        { ...registerData }
      )
      .then((res) => {
        if (res.status === 201) {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/error");
      });
  };

  return (
    <div className="center">
      <h1>Reset data</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Reset user" disabled ref={submit} />
      </form>
    </div>
  );
}
