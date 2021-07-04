import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Link from "next/link";

import Unauthorized from "../components/unauthorized";
import Dummy from "../components/forms/dummy";

export default function Home() {
  const context = useContext(AuthContext);

  return (
    <div>
      {context.user ? (
        <div>
          <Dummy />
          <Link href="/admin">
            <a>
              <button>Go to super admin panel</button>
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
