import FixtureCard from "@/components/FixtureCard";
import React from "react";
import { Pixelify_Sans } from "next/font/google";
const pxsans = Pixelify_Sans({ subsets: ["latin"] });
const Upcoming = [
  {
    fid: 1,
    team1: "CSK",
    team2: "MI",
    title: "Indian Primere League",
  },
  {
    fid: 2,
    team1: "CSK",
    team2: "RCB",
    title: "Indian Primere League",
  },
  {
    fid: 3,
    team1: "CSK",
    team2: "DC",
    title: "Indian Primere League",
  },
  {
    fid: 4,
    team1: "CSK",
    team2: "LSG",
    title: "Indian Primere League",
  },
];
function page() {
  return (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Upcoming Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participate in upcoming fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={Upcoming} completed={false} />
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Ongoing Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Ongoing fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={Upcoming} completed={true} />
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Completed Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Completed fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={Upcoming} completed={true} />
      </div>
    </div>
  );
}

export default page;
