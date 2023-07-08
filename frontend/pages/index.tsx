import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-row flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 1"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 1">
                  Card 1
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 2"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 2">
                  Card 2
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 3"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 3">
                  Card 3
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 4"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 4">
                  Card 4
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 5"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 5">
                  Card 5
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
          <div className="relative bg-white rounded border">
            <picture className="block bg-gray-200 border-b">
              <img
                className="block"
                src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
                alt="Card 6"
              />
            </picture>
            <div className="p-4">
              <h3 className="text-lg font-bold">
                <a className="stretched-link" href="#" title="Card 6">
                  Card 6
                </a>
              </h3>
              <time
                className="block mb-2 text-sm text-gray-600"
                dateTime="2019-01-01"
              >
                1st January 2019
              </time>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
