import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Link from "next/link";

import Unauthorized from "../../components/unauthorized";
import AdminTable from "../../components/admin/admin-Table";

export default function Home() {
  const context = useContext(AuthContext);
  console.log(context);

  return (
    <div>
      {context.user && context.user.user.role === "admin" ? (
        <div>
          <AdminTable />
          <Link href="/admin/register">
            <a>
              <button>Register a new user</button>
            </a>
          </Link>
          <style jsx>{`
            button {
              padding: 1em 1em;
              border: none;
              outline: none;
              margin: 1em 0.5em;
              background: crimson;
              color: white;
              border-radius: 5px;
              cursor: pointer;
              position: absolute;
              top: 0;
              right: 0;
            }
          `}</style>
        </div>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}
