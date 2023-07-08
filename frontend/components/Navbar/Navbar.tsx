import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="flex justify-between px-5 py-5 items-center bg-white">
      <h1 className="text-xl text-gray-800 font-bold">Evenia</h1>
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
          {session.status !== 'authenticated' && <li className="font-semibold text-gray-700" onClick={() => signIn()}>Login</li>}
          {session.status !== 'authenticated' && <li className="font-semibold text-gray-700" onClick={() => {}}>Signup</li>}
          {session.status === 'authenticated' && <li className="font-semibold text-gray-700">{session.data.user?.email}</li>}
          {/* <li className="font-semibold text-gray-700" onClick={}>Sign up</li> */}
        </ul>
      </div>
    </nav>
  );
}
