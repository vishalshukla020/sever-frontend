import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>oops! Looks like some error occured</h1>

      <p>Try loging in again</p>
      <Link href="/">
        <a>
          <button>Login Page</button>
        </a>
      </Link>

      <Link href="/home">
        <a>
          <button className="home">Home Page</button>
        </a>
      </Link>
      <style jsx>{`
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ffffff;
          padding: 2em 1.5em;
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
          margin: 0.5em 0.5em;
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
