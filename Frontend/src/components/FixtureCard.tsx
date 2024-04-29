import { PlusIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function FixtureCard(props: {
  fixtures: {
    fid: number;
    team1: string;
    team2: string;
    title: string;
  }[];
  completed: boolean;
}) {
  const fixtures = props.fixtures;
  const completed = props.completed;
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 p-14 ">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {fixtures.map((person) => (
            <li
              key={person.fid}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {person.team1} vs {person.team2}
                    </h3>
                    <span
                      className={`inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ${
                        completed
                          ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                          : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                      }`}
                    >
                      {completed ? "Entries Closed" : "Entries Open"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {person.title}
                  </p>
                </div>
                <img
                  className="h-8  flex-shrink-0 "
                  src={`/${person.team1}.png`}
                  alt=""
                />
                <img
                  className="h-8 flex-shrink-0  "
                  src={`/${person.team2}.png`}
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <Link
                      href={`/leaderboard/${person.fid}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      {" "}
                      <ChartBarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      View Leaderboard
                    </Link>
                  </div>

                  {!completed && (
                    <div className="-ml-px flex w-0 flex-1">
                      <Link
                        href={`/makesquad/${person.fid}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <PlusIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Make Squad
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
