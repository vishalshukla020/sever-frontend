import { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/auth";

export default function Home() {
  const context = useContext(AuthContext);
  const router = useRouter();

  const [resetData, setResetData] = useState({
    phone: "",
    otp: "",
    verify: false,
  });

  const onChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetData.verify === false) {
      axios
        .post(
          "https://mysterious-bastion-09867.herokuapp.com/api/user/reset-password",
          {
            phone: resetData.phone,
          }
        )
        .then((res) => {
          console.log(res);
          context.reset(res.data);
        })
        .catch((err) => {
          console.log(err);
          router.push("/error");
        });
    } else {
      axios
        .post(
          "https://mysterious-bastion-09867.herokuapp.com/api/user/verify-otp",
          {
            phone: resetData.phone,
            otp: resetData.otp,
            hash: context.user.hash,
          }
        )
        .then((res) => {
          if (res.data.data) {
            context.reset(res.data.data);
            router.push("/login/reset-password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setResetData({ ...resetData, verify: true });
  };

  return (
    <div className="center">
      <h1>{resetData.verify ? "Verify OTP" : "Get OTP"}</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="tel"
            name="phone"
            value={resetData.phone}
            onChange={onChange}
            required
          />
          <label htmlFor="">Phone no.</label>
        </div>
        {resetData.verify && (
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              name="otp"
              value={resetData.otp}
              onChange={onChange}
              required
            />
            <label htmlFor="">Enter OTP</label>
          </div>
        )}

        <Link href="/login">
          <a>Remember Password?</a>
        </Link>
        <input type="submit" value={resetData.verify ? "Verify" : "send OTP"} />
      </form>
    </div>
  );
}
