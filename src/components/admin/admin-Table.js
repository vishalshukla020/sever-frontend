import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminTable() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("https://mysterious-bastion-09867.herokuapp.com/posts", {
        headers: {
          "auth-token": localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {data ? data.map((item) => <Table data={item} />) : ""}
      <style jsx>{`
        div {
          max-width: 400px;
          box-shadow: 0 0.5rem 1rem rgba(51, 4, 4, 0.1),
            0 1rem 3rem rgba(0, 0, 0, 0.1);
          background: #ffffff;
          padding: 1em 1em;
        }
      `}</style>
    </div>
  );
}

const Table = ({ data }) => {
  const keys = Object.keys(data);
  console.log(data, keys);
  return (
    <div>
      {keys.map((key) => (
        <div className="row">
          <div className="key"> {key}</div>:
          <div className="value">{data[key]}</div>
        </div>
      ))}
      <style jsx>{`
        .row {
          display: flex;
          margin: 0.5em 0;
        }
        .key {
          flex: 1;
          font-weight: bold;
        }
        .value {
          flex: 2;
        }
      `}</style>
    </div>
  );
};
