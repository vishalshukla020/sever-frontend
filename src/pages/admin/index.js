import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Link from "next/link";

import Unauthorized from "../../components/unauthorized";

export default function Home() {
  const context = useContext(AuthContext);
  console.log(context);

  return (
    <div>
      {context.user && context.user.user.role === "admin" ? (
        <div>
          <Link href="/admin/register">
            <a> Register a new user</a>
          </Link>
        </div>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}
