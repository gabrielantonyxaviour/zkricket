import FixtureCard from "@/components/FixtureCard";
import React from "react";
const Upcoming = [
  {
    fid: 1,
    team1: "CSK",
    team2: "MI",
    title: "Indian Primere League",
    role: "Entries Open",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    fid: 2,
    team1: "CSK",
    team2: "RCB",
    title: "Indian Primere League",
    role: "Entries Open",

    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    fid: 3,
    team1: "CSK",
    team2: "DC",
    name: "Jane Cooper",
    title: "Indian Primere League",
    role: "Entries Open",

    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    fid: 4,
    team1: "CSK",
    team2: "LSG",
    name: "Jane Cooper",
    title: "Indian Primere League",
    role: "Entries Open",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];
function page() {
  return (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Upcoming Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participate in upcoming fixtures
          </p>
        </div>
      </div>
      <FixtureCard fixtures={Upcoming} completed={false} />
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Completed Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Completed fixtures
          </p>
        </div>
      </div>
      <FixtureCard fixtures={Upcoming} completed={true} />
    </div>
  );
}

export default page;
