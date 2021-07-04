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
    <div className="wrapper">
      {data
        ? data.map((item) => (
            <div className="inner">
              <Table data={item} />
            </div>
          ))
        : ""}
      <style jsx>{`
        .wrapper {
          max-width: 450px;
          box-shadow: 0 0.5rem 1rem rgba(51, 4, 4, 0.1),
            0 1rem 3rem rgba(0, 0, 0, 0.1);
          background: #ffffff;
          padding: 1em 1em;
        }
        .inner {
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
}

const Table = ({ data }) => {
  const keys = Object.keys(data);
  console.log(data, keys);
  return (
    <div className="box">
      {keys.map((key) => (
        <div className="row">
          <div className="key"> {key}</div>:
          <div className="value">{data[key]}</div>
        </div>
      ))}
      <style jsx>{`
        .box {
          padding: 1em 0;
        }
        .row {
          display: flex;
          margin: 0.5em 0;
        }
        .row:nth-child(odd) {
          background: rgba(245, 245, 245);
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
