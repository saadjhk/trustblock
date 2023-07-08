import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="flex justify-between px-5 py-5 items-center bg-white">
      <h1 className="text-xl text-gray-800 font-bold">
        <Link href={"/"}>Evenia</Link>
      </h1>
      <div className="flex items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 pt-0.5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="ml-2 outline-none bg-transparent font-"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>

        <ul className="flex items-center space-x-6">
          {session.status !== "authenticated" && (
            <li
              className="font-semibold text-gray-700"
              onClick={() => signIn()}
            >
              Login
            </li>
          )}
          {session.status !== "authenticated" && (
            <li className="font-semibold text-gray-700" onClick={() => {}}>
              Signup
            </li>
          )}
          {session.status === "authenticated" && (
            <li className="font-semibold text-gray-700">
              <Link href={"/my-events"}>My Events</Link>
            </li>
          )}
          {session.status === "authenticated" && (
            <li
              className="font-semibold text-gray-700"
              onClick={() => signOut()}
            >
              Logout
            </li>
          )}
        </ul>

        {session.status === "authenticated" && (
          <div className="flex md:order-2 ml-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Link href={"/create-event"}>Create Event</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
