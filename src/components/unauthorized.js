import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>You are not authorized to access this page</h1>
      <p>
        Try loging in again
        <br />
        <Link href="/">
          <a>
            <button>Login Page</button>
          </a>
        </Link>
        <Link href="/home">
          <a>
            <button className="home">Home page</button>
          </a>
        </Link>
      </p>

      <style jsx>{`
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ffffff;
          padding: 2em 2em;
          box-shadow: 0 0.5rem 1rem rgba(51, 4, 4, 0.1),
            0 1rem 3rem rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 1.875rem;
          font-weight: bold;
        }
        p {
          margin: 1em 0;
          line-height: 1.5;
        }

        button {
          padding: 1em 1em;
          border: none;
          outline: none;
          margin: 1em 0.5em;
          background: crimson;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .home {
          background: #2691d9;
        }
      `}</style>
    </div>
  );
}
