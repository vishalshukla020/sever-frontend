import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Link from "next/link";

import Unauthorized from "../components/unauthorized";

export default function Home() {
  const context = useContext(AuthContext);

  return (
    <div>
      {context.user ? (
        <h1>
          Forms to fill up
          <Link href="/admin">
            <a> admin</a>
          </Link>
        </h1>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
}
