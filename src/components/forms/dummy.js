import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { AuthContext } from "../../context/auth";

export default function Home() {
  const context = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: context.user ? context.user.user.username : "",
    firstName: "",
    lastName: "",
    email: "",
    accountNumber: "",
    title: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/posts/create", { ...formData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setFormData({
      username: context.user ? context.user.user.username : "",
      firstName: "",
      lastName: "",
      email: "",
      accountNumber: "",
      title: "",
    });
  };

  return (
    <div className="dummy">
      <h1>Dummy form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
          <label htmlFor="">First Name</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            name="lastName"
            value={formData.lastname}
            onChange={onChange}
            required
          />
          <label htmlFor="">Last Name</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <label htmlFor="">E-mail</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={onChange}
            required
          />
          <label htmlFor="">Bank Account No.</label>
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
          <label htmlFor="">Title</label>
        </div>

        <input type="submit" value="submit" />
      </form>
      <style jsx>{`
        .dummy {
          background: #fff;
          max-width: 400px;
          box-shadow: 0 0.5rem 1rem rgba(51, 4, 4, 0.1),
            0 1rem 3rem rgba(0, 0, 0, 0.1);
          padding: 1em 1em;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
