import { ChevronDownIcon } from "@heroicons/react/20/solid";

const people = [
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
  {
    name: "Lindsay Walton",
    points: "5",
    commitmenthash: "afafasfasfas",
  },
];

export default function Leaderboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 border-2 rounded-lg shadow-md">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <a href="#" className="group inline-flex">
                      Ranking
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Name
                      <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Points
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Commitment Hash
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                          className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.points}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.commitmenthash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
